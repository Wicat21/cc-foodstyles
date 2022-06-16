import axios from 'axios';
const baseURL = 'https://api-dev.foodstyles.com/graphql';
const access_token =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAwLCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjU1MzY4MzgyLCJleHAiOjE2NTU5NzMxODJ9.c7rOlDtPHoBsRfBz0lADgjkHtmrBqTvrGyoaaExTwUxIdxwU9hwRiWIVMATYFjElbomMbFLauB8zzjlDeC-VzcyDJa18DShy0C2cGoblAKnnmkqg2VdSkW4nGHYOhoq3pimft90hNb6yAnri85KTf2rHyLT407n4R-PWXL0RsptatWpUJuinG-U6u-2-khsYFIPvBkqjPqpz_j29fFmYx2IDb3N35725V9F_BvKstSP3nmZmMSbChrO-S63gAnjskOoND35fkBhrqRP8ztKKhBHoAvO7L1nT-1U9KWIZfyl5m2fZluE8UWxBf_tYnoehpAaaLdxLzA4YqSD_yy0Jvg';

export const openCardModal = item => dispatch => {
  dispatch({type: 'OPEN_CARD_MODAL', data: item});
};
export const hideCardModal = () => dispatch => {
  dispatch({type: 'HIDE_CARD_MODAL'});
};

export const closeCardModal = () => dispatch => {
  dispatch({type: 'CLOSE_CARD_MODAL'});
};

export const getCards = () => dispatch => {
  const graphqlQuery = {
    query: `query {
      cards {
          id
          name       
      }
   }`,
  };

  axios({
    url: baseURL,
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    data: graphqlQuery,
  })
    .then(res => dispatch({type: 'GET_CARDS', data: res.data.data.cards}))
    .catch(err => console.log(err));
};

export const createCard = () => dispatch => {
  const graphqlQuery = {
    query: `
  mutation {
    createCard(
        data: {
            name: "My Food Style",
            minPrice: null,
            maxPrice: null,
            locationTypeIds: [],
            locationCuisineTypeIds: [],
            dishTypeIds: [],
            courseTypeIds: [],
            dietIds: [],
            excludedIngredientIds: []
        }
    ) {
        id
        name       
  }
 }
  `,
  };
  axios({
    url: baseURL,
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    data: graphqlQuery,
  })
    .then(res => dispatch(getCards()))
    .catch(err => console.log(err));
};

export const shareCard = id => dispatch => {
  const graphqlQuery = {
    query: `
    mutation {
      shareCard(
          id: ${id}      
      )
   }
  `,
  };
  axios({
    url: baseURL,
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    data: graphqlQuery,
  })
    .then(res => dispatch({type: 'SHARE_CARD', data: res.data.data.shareCard}))
    .catch(err => console.log(err));
};

export const duplicateCard = id => (dispatch, getState) => {
  const cards = getState().state.cards;
  const graphqlQuery = {
    query: `
    mutation {
      duplicateCard(
          id: ${id}       
      ) {
          id
          name           
    }
   }
  `,
  };
  axios({
    url: baseURL,
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    data: graphqlQuery,
  })
    .then(res =>
      //dispatch(getCards())
      {
        dispatch({
          type: 'GET_CARDS',
          data: [...cards, res.data.data.duplicateCard],
        });
        dispatch({type: 'HIDE_CARD_MODAL'});
      },
    )
    .catch(err => console.log(err));
};

export const openDeleteModal = item => dispatch => {
  dispatch({type: 'OPEN_DELETE_MODAL'});
};

export const closeDeleteModal = () => dispatch => {
  dispatch({type: 'CLOSE_DELETE_MODAL'});
};

export const deleteCard = () => (dispatch, getState) => {
  const selectedItem = getState().state.selectedItem;
  const cards = getState().state.cards;
  const graphqlQuery = {
    query: `
    mutation {
      deleteCard(
          id: ${selectedItem.id}       
      ) 
   }
  `,
  };
  axios({
    url: baseURL,
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + access_token,
    },
    data: graphqlQuery,
  })
    .then(res => {
      //dispatch(getCards())
      dispatch({
        type: 'GET_CARDS',
        data: cards.filter(item => item.id !== selectedItem.id),
      });
      dispatch({type: 'CLOSE_DELETE_MODAL'});
      dispatch({type: 'HIDE_CARD_MODAL'});
    })
    .catch(err => console.log(err));
};
