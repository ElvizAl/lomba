"use client"

import type React from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import Loading from "../ui/loading"
import { scanTransaction } from "@/utils/transaction"
import Image from "next/image"

type CameraScannerProps = {
  className?: string
  onCapture?: (blob: Blob, dataUrl: string) => void
  onPickFromGallery?: (file: File, dataUrl: string) => void
}

export default function CameraScanner({ className, onCapture }: CameraScannerProps) {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const trackRef = useRef<MediaStreamTrack | null>(null)
  const [loading, setLoading] = useState(false)
  const [isTorchOn, setIsTorchOn] = useState(false)
  const [torchSupported, setTorchSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const [scanMode, setScanMode] = useState<"struck" | "manual">("struck")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const constraints = useMemo(
    () => ({
      video: {
        facingMode: { ideal: "environment" },
        width: { ideal: 1280 },
        height: { ideal: 720 },
      },
      audio: false,
    }),
    [],
  )

  const switchToDevice = useCallback(async (deviceId: string) => {
    try {
      trackRef.current?.stop()
      streamRef.current?.getTracks().forEach((t) => t.stop())

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId } },
        audio: false,
      })
      streamRef.current = newStream
      const videoEl = videoRef.current
      if (videoEl) {
        videoEl.srcObject = newStream
        await videoEl.play().catch(() => { })
      }
      const [newTrack] = newStream.getVideoTracks()
      trackRef.current = newTrack

      const caps: any = typeof newTrack.getCapabilities === "function" ? newTrack.getCapabilities() : {}
      setTorchSupported(!!caps?.torch)
      setIsTorchOn(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    const videoEl = videoRef.current
    async function init() {
      try {
        setError(null)
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        if (!isMounted) return
        streamRef.current = stream
        if (videoEl) {
          videoEl.setAttribute("playsinline", "")
          videoEl.setAttribute("webkit-playsinline", "")
          videoEl.muted = true

          videoEl.srcObject = stream

          const onPlaying = () => { }
          const onPause = () => { }
          videoEl.addEventListener("playing", onPlaying)
          videoEl.addEventListener("pause", onPause)

          await videoEl.play().catch(() => {
            // autoplay bisa gagal sampai ada gesture user
          })

          const cleanup = () => {
            videoEl.removeEventListener("playing", onPlaying)
            videoEl.removeEventListener("pause", onPause)
          }
            ; (videoEl as any).__v0_cleanup = cleanup
        }
        const [track] = stream.getVideoTracks()
        trackRef.current = track
        const caps: any = typeof track.getCapabilities === "function" ? track.getCapabilities() : {}
        const supported = !!caps?.torch
        setTorchSupported(supported)

        try {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoInputs = devices.filter((d) => d.kind === "videoinput")
          const backCandidates = videoInputs.filter((d) => {
            const label = (d.label || "").toLowerCase()
            return label.includes("back") || label.includes("rear") || label.includes("environment")
          })
          const preferred = backCandidates[0] || videoInputs[videoInputs.length - 1]
          const currentDeviceId = typeof track.getSettings === "function" ? track.getSettings().deviceId : undefined
          if (preferred && preferred.deviceId && preferred.deviceId !== currentDeviceId) {
            await switchToDevice(preferred.deviceId)
          }
        } catch {
          // diamkan jika enumerateDevices gagal
        }
      } catch (e: any) {
        setError(e?.message || "Gagal mengakses kamera")
      }
    }
    init()
    return () => {
      isMounted = false
      if (videoEl) {
        const v = videoEl as any
        if (v?.__v0_cleanup) {
          v.__v0_cleanup()
          delete v.__v0_cleanup
        }
      }
      trackRef.current?.stop()
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
      trackRef.current = null
    }
  }, [constraints, switchToDevice])

  const toggleTorch = useCallback(async () => {
    const track = trackRef.current
    if (!track) return
    if (!torchSupported) return
    try {
      await track.applyConstraints({ advanced: [{ torch: !isTorchOn }] } as any)
      setIsTorchOn((v) => !v)
    } catch {
      setIsTorchOn(false)
    }
  }, [torchSupported, isTorchOn])

  const flashOverlay = useCallback(() => {
    setIsFlashing(true)
    setTimeout(() => setIsFlashing(false), 120)
  }, [])

  const handleCapture = useCallback(async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    if (!torchSupported) {
      flashOverlay()
    }

    const vw = video.videoWidth || 1280
    const vh = video.videoHeight || 720
    canvas.width = vw
    canvas.height = vh
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, vw, vh)
    canvas.toBlob(
      async (blob) => {
        if (!blob) return

        handleScan(blob as File)

        const dataUrl = canvas.toDataURL("image/jpeg", 0.92)
        setPreviewUrl(dataUrl)
        onCapture?.(blob, dataUrl)
      },
      "image/jpeg",
      0.92,
    )
  }, [onCapture, torchSupported, flashOverlay])

  const openGallery = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const onFilePicked = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      handleScan(file)
      // reader.onload = () => {
      //   const dataUrl = String(reader.result || "")
      //   setPreviewUrl(dataUrl)

      //   const img = new Image()
      //   img.crossOrigin = "anonymous"
      //   img.onload = () => {
      //     onPickFromGallery?.(file, dataUrl)
      //     setLoading(false)
      //   }
      //   img.src = dataUrl
      // }
      // reader.readAsDataURL(file)
      // e.currentTarget.value = ""
    },
    [router],
  )

  const handleScan = async (file: File) => {
    setLoading(true)
    try {
      const result = await scanTransaction(file)
      const mappedResult = result.map((item: any) => ({
        keterangan: item.name,
        nominal: item.total,
        tanggal: item.date,
      }))
      localStorage.setItem("transaction", JSON.stringify(mappedResult))

      router.push("/input-manual")
    } catch (err) {
      setLoading(false)
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const onVis = () => {
      if (document.visibilityState === "visible") {
        const v = videoRef.current
        if (v && v.paused) {
          v.play().catch(() => { })
        }
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => document.removeEventListener("visibilitychange", onVis)
  }, [])

  useEffect(() => {
    if (scanMode === "manual") {
      router.push("/input-manual")
    }
  }, [scanMode, router])

  if (loading) {
    return <Loading />
  }

  return (
    <section className={cn("relative w-full h-screen bg-background", className)} aria-label="Kamera Scanner">
      <Tabs
        value={scanMode}
        onValueChange={(value) => setScanMode(value as "struck" | "manual")}
        className="absolute top-20 left-0 right-0 z-10 mt-5 text-center justify-center items-center"
      >
        <TabsList className="w-64 rounded-full bg-white border-b border-foreground/10">
          <TabsTrigger value="struck" className="flex-1">
            Scan Struk
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex-1">
            Manual
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          playsInline
          muted
          autoPlay
          aria-label="Pratinjau kamera"
        />

        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="relative h-2/3 w-2/3 max-w-[320px]">
            <span className="absolute left-0 top-0 h-6 w-6 border-t-4 border-l-4 border-primary rounded-tl-md" />
            <span className="absolute right-0 top-0 h-6 w-6 border-t-4 border-r-4 border-primary rounded-tr-md" />
            <span className="absolute left-0 bottom-0 h-6 w-6 border-b-4 border-l-4 border-primary rounded-bl-md" />
            <span className="absolute right-0 bottom-0 h-6 w-6 border-b-4 border-r-4 border-primary rounded-br-md" />
          </div>
        </div>

        {isFlashing && (
          <div aria-hidden="true" className="absolute inset-0 bg-white/60 animate-in fade-in-0 duration-100" />
        )}

        {previewUrl && (
          <div className="absolute inset-0 grid place-items-center bg-black/40 backdrop-blur-sm">
            <div className="relative w-4/5 max-w-sm">
              <div className="relative w-full aspect-square rounded-lg border-4 border-primary overflow-hidden">
                <Image
                  src={previewUrl}
                  alt="Hasil jepretan"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
              <button
                type="button"
                onClick={() => setPreviewUrl(null)}
                className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold"
                aria-label="Tutup hasil"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="absolute bottom-20 left-0 right-0 flex items-center justify-around gap-6 px-4">
          <button
            type="button"
            onClick={toggleTorch}
            disabled={!torchSupported}
            aria-pressed={isTorchOn}
            aria-label={torchSupported ? (isTorchOn ? "Matikan flash" : "Nyalakan flash") : "Flash tidak didukung"}
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-full border-2",
              torchSupported
                ? isTorchOn
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-white text-foreground border-foreground/30"
                : "bg-muted text-muted-foreground cursor-not-allowed border-muted",
            )}
            title={torchSupported ? "Flash" : "Flash tidak didukung pada perangkat ini"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
            </svg>
            <span className="sr-only">Flash</span>
          </button>

          <button
            type="button"
            onClick={handleCapture}
            aria-label="Ambil foto"
            className="relative h-16 w-16 rounded-full border-4  border-primary bg-white hover:bg-primary/30 transition-colors"
          >
            <span className="absolute inset-2 rounded-full bg-primary" />
            <span className="sr-only">Jepret</span>
          </button>

          <button
            type="button"
            onClick={openGallery}
            aria-label="Buka galeri"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white text-foreground border-foreground/30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M21 19V7a2 2 0 0 0-2-2H5C3.9 5 3 5.9 3 7v12c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2zM8 9a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm11 9H5v-1.59l3.29-3.3c.39-.39 1.02-.39 1.41 0L12 15l4.29-4.29c.39-.39 1.02-.39 1.41 0L19 12.01V18z" />
            </svg>
            <span className="sr-only">Galeri</span>
          </button>
        </div>

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFilePicked} />
      </div>

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />

      {error && (
        <div
          role="status"
          className="absolute bottom-32 left-4 right-4 rounded-md border bg-destructive/10 p-3 text-sm"
        >
          {error}
        </div>
      )}
    </section>
  )
}
