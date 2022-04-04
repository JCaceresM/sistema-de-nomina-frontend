
import { AccountActions, AccountType } from "../../actions/accounts/accounts.actions"

import { ResponseMetadata } from "../../common/types/response.type"
import { ACCOUNT_CREATE_ACCOUNT, ACCOUNT_CREATE_ACCOUNT_FAILURE, ACCOUNT_CREATE_ACCOUNT_SUCCESS, ACCOUNT_GET_ACCOUNT, ACCOUNT_GET_ACCOUNT_FAILURE, ACCOUNT_GET_ACCOUNT_SUCCESS, ACCOUNT_MANAGER_REDUX_STATE_ACCOUNT, ACCOUNT_UPDATE_ACCOUNT, ACCOUNT_UPDATE_ACCOUNT_FAILURE, ACCOUNT_UPDATE_ACCOUNT_SUCCESS } from "../../constants/accounts/accounts.constants"

export type AccountState = {
  getAccountsIsLoading: boolean
  createAccountsIsLoading: boolean
  isAccountUpdated: boolean
  isAccountCreated: boolean
  accounts: AccountType[]
  accountsMetadata: ResponseMetadata
}

const initialState = {
  getAccountsIsLoading: false,
  createAccountsIsLoading: false,
  isAccountUpdated: false,
  isAccountCreated: false,
  accounts: new Array<AccountType>(),
  accountsMetadata: {} as ResponseMetadata,
}

const accounts = (
  state: AccountState = initialState,
  action: AccountActions
): AccountState => {
  switch (action.type) {
    case ACCOUNT_GET_ACCOUNT:
      return {
        ...state,

        getAccountsIsLoading: true,
      }
    case ACCOUNT_GET_ACCOUNT_FAILURE:
      return {
        ...state,
        accounts: [],
        accountsMetadata: {} as ResponseMetadata,
        getAccountsIsLoading: false,
      }
    case ACCOUNT_GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: action.accounts,
        accountsMetadata: action.metadata,
        getAccountsIsLoading: false,
      }
    case ACCOUNT_CREATE_ACCOUNT:
      return {
        ...state,

        createAccountsIsLoading: true,
      }
    case ACCOUNT_CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        createAccountsIsLoading: false,
      }
    case ACCOUNT_CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: [...state.accounts, action.created],
        createAccountsIsLoading: false,
        isAccountCreated: true,
      }
    case ACCOUNT_UPDATE_ACCOUNT:
      return {
        ...state,
        isAccountUpdated: true,
      }
    case ACCOUNT_UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        isAccountUpdated: false,
      }
    case ACCOUNT_UPDATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isAccountUpdated: false,
      }
      case ACCOUNT_MANAGER_REDUX_STATE_ACCOUNT:  
      return {
        ...state,
        ...action.state
      }
    default:
      return state
  }
}

export default accounts
