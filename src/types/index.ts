// Auth Related Types
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface RegisterFormat {
  status: string;
  message: string;
  data: {
    token: string;
    user: UserData;
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OTPResponse {
  message: string;
  status: string;
  data?: {
    resetToken?: string;
    token?: string;
    user?: UserData;
  };
  email?: string;
  otp?: string;
}

export interface ResetPasswordData {
  password: string;
  password_confirmation: string;
}

// User Related Types
export interface UserData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  fingerprint_hash?: string | null;
  createdAt: string;
  updatedAt: string;
  last_login: string | null;
  role: string;
}

export interface User {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  cash: {
    id: string;
    balance: number;
  };
}

export interface UpdateProfileData {
  name: string;
  email: string;
  avatar?: File | string;
}

// Transaction Related Types
export interface Transaction {
  id: string;
  note: string;
  amount: number;
  date: string;
  qty: number;
  type: "debit" | "credit";
  createdAt: string;
}

export interface InputItem {
  id: string;
  keterangan: string;
  nominal: string;
  jumlah: string;
  tanggal: string;
}

// Report Related Types
export interface ReportItem {
  item_name: string;
  amount: number;
}

export interface ReportSection {
  section: string;
  items: ReportItem[];
}

export interface ProductCost {
  id: string;
  name: string;
  cost: string;
  created_at: string;
  updated_at: string;
}

// Component Props
export interface LayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export interface NavbarProps {
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  className?: string;
}

export interface ScrollWrapperProps {
  children: React.ReactNode;
}

export interface ProfileAvatarProps {
  src?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onChange?: (file: File) => void;
}

export interface ItemsProps {
  sections: ReportSection[];
}

// API Response Types
export interface ApiResponse<T> {
  message: string;
  status: string;
  data?: T;
}

export interface LoginResponse
  extends ApiResponse<{ token: string; user: UserData }> {
  data: { token: string; user: UserData };
}
export interface RegisterResponse
  extends Omit<ApiResponse<{ token: string; user: UserData }>, "data"> {
  data?: { token: string; user: UserData };
  email?: string;
  otp?: string;
}

export interface ChangePasswordResponse
  extends ApiResponse<Record<string, string>> {
  data: Record<string, string>;
}
export interface ResetResponse extends ApiResponse<Record<string, string>> {
  data: Record<string, string>;
  email?: string;
}

export interface InboxData {
  id: string;
  title: string;
  content: string;
  is_read: boolean;
  createdAt: string;
  updatedAt: string;
  metadata: {
    image: string;
  };
}
