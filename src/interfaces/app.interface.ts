export interface IStoreResponse {
  ok: boolean;
  message: string;
}

export interface ISnackbarComponent {
  success: boolean;
  message: string;
  active: boolean;
  timeout: number;
}