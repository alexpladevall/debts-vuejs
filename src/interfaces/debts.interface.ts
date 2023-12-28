export interface IDebt {
  id: string;
  name: string;
  balance: number;
}

export interface IAddDebtDto {
  withUserId: string;
  quantity: number;
}