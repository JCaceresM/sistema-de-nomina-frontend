import {
  PaginationType,
  SelectConditionType,
} from "../../common/types/general.type";
import { ResponseMetadata } from "../../common/types/response.type";
import {
  ACCOUNT_CREATE_ACCOUNT,
  ACCOUNT_CREATE_ACCOUNT_FAILURE,
  ACCOUNT_CREATE_ACCOUNT_SUCCESS,
  ACCOUNT_GET_ACCOUNT,
  ACCOUNT_GET_ACCOUNT_FAILURE,
  ACCOUNT_GET_ACCOUNT_SUCCESS,
  ACCOUNT_MANAGER_REDUX_STATE_ACCOUNT,
  ACCOUNT_UPDATE_ACCOUNT,
  ACCOUNT_UPDATE_ACCOUNT_FAILURE,
  ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
} from "../../constants/accounts/accounts.constants";
import { AccountState } from "../../reducers/accounts/accounts.reducer";
export type AccountType = {
  id: number;
  description: string;
  name: string;
  balance: number;
  type: number;
  status: string;
  company_id: number;
  updated_at: Date;
  created_at: Date;
  user_update: string;
  user_insert: string;
};
export type AccountsManagerReduxStateAction = {
  state: Partial<AccountState>;
  type: typeof ACCOUNT_MANAGER_REDUX_STATE_ACCOUNT;
};

export const accountsManagerReduxState = (
  state: Partial<AccountState>
): AccountsManagerReduxStateAction => {
  return {
    type: ACCOUNT_MANAGER_REDUX_STATE_ACCOUNT,
    state,
  };
};
export type GetAccountsAction = {
  type: typeof ACCOUNT_GET_ACCOUNT;
  pagination: PaginationType;
  searchConditions?: SelectConditionType[];
};

export const getAccounts = ({
  pagination,
  searchConditions = [],
}: {
  pagination: PaginationType;
  searchConditions?: SelectConditionType[];
}): GetAccountsAction => {
  return {
    type: ACCOUNT_GET_ACCOUNT,
    pagination,
    searchConditions,
  };
};

type GetAccountSuccessAction = {
  type: typeof ACCOUNT_GET_ACCOUNT_SUCCESS;
  accounts: AccountType[];
  metadata: ResponseMetadata;
};

export const getAccountsSuccess = (
  accounts: AccountType[],
  metadata: ResponseMetadata
): GetAccountSuccessAction => {
  return {
    type: ACCOUNT_GET_ACCOUNT_SUCCESS,
    accounts: accounts,
    metadata,
  };
};

type GetAccountFailureAction = {
  type: typeof ACCOUNT_GET_ACCOUNT_FAILURE;
};

export const getAccountsFailure = (): GetAccountFailureAction => {
  return {
    type: ACCOUNT_GET_ACCOUNT_FAILURE,
  };
};
// -----------------create------------------------
export type CreateAccountAction = {
  type: typeof ACCOUNT_CREATE_ACCOUNT;
  create: Partial<AccountType>;
};

export const createAccount = (
  create: Partial<AccountType>
): CreateAccountAction => {
  return {
    create,
    type: ACCOUNT_CREATE_ACCOUNT,
  };
};

type CreateAccountSuccessAction = {
  type: typeof ACCOUNT_CREATE_ACCOUNT_SUCCESS;
  created: AccountType;
};

export const createAccountSuccess = (
  created: AccountType
): CreateAccountSuccessAction => {
  return {
    type: ACCOUNT_CREATE_ACCOUNT_SUCCESS,
    created,
  };
};

type CreateAccountFailureAction = {
  type: typeof ACCOUNT_CREATE_ACCOUNT_FAILURE;
};

export const createAccountFailure = (): CreateAccountFailureAction => {
  return {
    type: ACCOUNT_CREATE_ACCOUNT_FAILURE,
  };
};
//-------------------update-------------------//
export type UpdateAccountAction = {
  type: typeof ACCOUNT_UPDATE_ACCOUNT;
  patchAccount: Partial<AccountType>;
  id: number;
};

export const updateAccount = (
  id: number,
  patchAccount: Partial<AccountType>
): UpdateAccountAction => {
  return { id, patchAccount, type: ACCOUNT_UPDATE_ACCOUNT };
};

type UpdateAccountSuccessAction = {
  type: typeof ACCOUNT_UPDATE_ACCOUNT_SUCCESS;
  UpdatedAccount: AccountType;
};

export const updateAccountSuccess = (
  UpdatedAccount: AccountType
): UpdateAccountSuccessAction => {
  return {
    type: ACCOUNT_UPDATE_ACCOUNT_SUCCESS,
    UpdatedAccount,
  };
};

type UpdateAccountFailureAction = {
  type: typeof ACCOUNT_UPDATE_ACCOUNT_FAILURE;
};

export const updateAccountFailure = (): UpdateAccountFailureAction => {
  return {
    type: ACCOUNT_UPDATE_ACCOUNT_FAILURE,
  };
};
export type AccountActions =
  | GetAccountsAction
  | GetAccountSuccessAction
  | GetAccountFailureAction
  | CreateAccountAction
  | CreateAccountSuccessAction
  | CreateAccountFailureAction
  | AccountsManagerReduxStateAction
  | UpdateAccountAction
  | UpdateAccountSuccessAction
  | UpdateAccountFailureAction;
