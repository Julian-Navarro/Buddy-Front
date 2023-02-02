import {
  GET_ALL_PETS,
  GET_ADOPTION_PETS,
  GET_PET_ID,
  GET_LOST_PETS,
  POST_PET,
  POST_USER,
  POST_PRODUCT,
  FILTER_SPECIE_ADOPTION,
  FILTER_SEX_ADOPTION,
  FILTER_AGE_ADOPTION,
  FILTER_SIZE_ADOPTION,
  FILTER_BY_SEARCH_AREA_ADOPTION,
  FILTER_SPECIE_LOST,
  FILTER_LOST_SEX,
  FILTER_LOST_AGE,
  FILTER_LOST_SIZE,
  FILTER_LOST_SEARCH_AREA,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  SHOP_SEARCH_INPUT_NAME,
  SHOP_FILTER_VALUE,
  NEXT_PAGE,
  PREV_PAGE,
  ACTUAL_PAGE,
  GET_VETERINARIES,
  GET_DETAILS_VETERINARIES,
  GET_ALL_USERS,
  SET_STATUS_USER,
} from "../ActionTypes";

const initialState = {
  allPets: [],
  adoptionPets: [],
  lostPets: [],
  pets: [],
  Detail: {},
  allProducts: [],
  products: [],
  productDetail: {},
  actualPage: 1,
  allVets: [],
  vetsDetail: {},
  allUsers: [],
  cart: [],
  functions: {},
};

const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_ALL_PETS:
      return {
        ...state,
        allPets: action.payload,
        pets: action.payload,
      };
    case GET_ADOPTION_PETS:
      return {
        ...state,
        allPets: action.payload,
        adoptionPets: action.payload.filter(
          (pet) => pet.status === "encontrado"
        ),
        pets: action.payload.filter((pet) => pet.status === "encontrado"),
      };
    case GET_LOST_PETS:
      return {
        ...state,
        lostPets: action.payload.filter((pet) => pet.status === "perdido"),
        pets: action.payload.filter((pet) => pet.status === "perdido"),
      };
    case GET_PET_ID:
      return {
        ...state,
        Detail: action.payload,
      };
    case POST_PET:
      return {
        ...state,
      };
    case POST_USER:
      return {
        ...state,
      };
    case POST_PRODUCT:
      return {
        ...state,
      };
    case FILTER_SPECIE_ADOPTION:
      return {
        ...state,
        pets: state.adoptionPets.filter(
          (pet) => pet.species === action.payload
        ),
        actualPage: 1,
      };
    case FILTER_SEX_ADOPTION:
      return {
        ...state,
        pets: state.adoptionPets.filter((pet) => pet.sex === action.payload),
        actualPage: 1,
      };
    case FILTER_AGE_ADOPTION:
      return {
        ...state,
        pets: state.adoptionPets.filter((pet) => pet.age === action.payload),
        actualPage: 1,
      };
    case FILTER_SIZE_ADOPTION:
      return {
        ...state,
        pets: state.adoptionPets.filter((pet) => pet.size === action.payload),
        actualPage: 1,
      };
    case FILTER_BY_SEARCH_AREA_ADOPTION:
      return {
        ...state,
        pets: state.adoptionPets.filter((pet) =>
          pet.area.toLowerCase().includes(action.payload.toLowerCase())
        ),
        actualPage: 1,
      };
    case FILTER_SPECIE_LOST:
      return {
        ...state,
        pets: state.lostPets.filter((pet) => pet.species === action.payload),
        actualPage: 1,
      };
    case FILTER_LOST_SEX:
      return {
        ...state,
        pets: state.lostPets.filter((pet) => pet.sex === action.payload),
        actualPage: 1,
      };
    case FILTER_LOST_AGE:
      return {
        ...state,
        pets: state.lostPets.filter((pet) => pet.age === action.payload),
        actualPage: 1,
      };
    case FILTER_LOST_SIZE:
      return {
        ...state,
        pets: state.lostPets.filter((pet) => pet.size === action.payload),
        actualPage: 1,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
    case SHOP_SEARCH_INPUT_NAME:
      return {
        ...state,
        products: state.allProducts.filter((product) =>
          product.name.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case FILTER_LOST_SEARCH_AREA:
      return {
        ...state,
        pets: state.lostPets.filter((pet) =>
          pet.area.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    case SHOP_FILTER_VALUE:
      return {
        ...state,
        products: state.allProducts.filter(
          (p) => p.Category === action.payload
        ),
      };
    case ACTUAL_PAGE:
      return {
        ...state,
        actualPage: action.payload,
      };
    case NEXT_PAGE:
      return {
        ...state,
        actualPage: action.payload,
      };
    case PREV_PAGE:
      return {
        ...state,
        actualPage: action.payload,
      };
    case GET_VETERINARIES:
      return {
        ...state,
        allVets: action.payload,
      };
    case GET_DETAILS_VETERINARIES:
      return {
        ...state,
        vetsDetail: action.payload,
      };
    case SET_STATUS_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default RootReducer;
