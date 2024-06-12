import { ConstructorType } from '@jaranda/core-ts/types/utils/types';
import { Transaction } from './Transaction';
export declare class TransactionManager {
  private transaction;
  private createdTransactions;
  constructor(transaction?: Map<string | Symbol | ConstructorType<any>, Transaction>);
  setTransaction(
    key: string | Symbol | ConstructorType<any>,
    transaction: Transaction
  ): Map<string | Symbol | ConstructorType<any>, Transaction<any, any, any, any>>;
  hasTransaction(key: string | Symbol | ConstructorType<any>): boolean;
  deleteTransaction(key: string | Symbol | ConstructorType<any>): boolean;
  getTransaction<T = any, I = any>(type: string | Symbol | ConstructorType<T>): Transaction<I, T> | undefined;
  try(): Promise<void>;
  catch(e: any): Promise<void>;
  finally(): Promise<void>;
}
