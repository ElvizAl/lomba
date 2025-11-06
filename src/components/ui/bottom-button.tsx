const BottomButton = ({ isSubmitting, isFormValid, onSubmit = () => { }, text, type }: { isSubmitting: boolean, isFormValid: boolean, onSubmit?: () => void, text: string, type?: "submit" | "reset" | "button" }) => {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full">
            <div className="max-w-md mx-auto bg-white border-t p-4">
                <button
                    type={type || "button"}
                    onClick={onSubmit}
                    disabled={isSubmitting || !isFormValid}
                    className='bg-blue-600 text-sm hover:bg-blue-700 text-white px-4 py-3 rounded-full w-full transition-colors disabled:opacity-50 flex justify-center items-center gap-2'
                >
                    {isSubmitting ? (
                        <>
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                            Memproses...
                        </>
                    ) : text}
                </button>
            </div>
        </div>
    )
}

export default BottomButton
