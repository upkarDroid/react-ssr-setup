// @flow
// import type { Dispatch } from 'redux';

export const ActionTypes = {
    _REQUEST: 'react-ssr-setup//request',
    _SUCCESS: 'react-ssr-setup//success',
    _FAILURE: 'react-ssr-setup//failure',
    _INVALIDATE: 'react-ssr-setup//invalidate',
};

export const Request = () => ({
    type: ActionTypes._REQUEST,
});

export const Success = (items: T[]) => ({
    type: ActionTypes._SUCCESS,
    payload: {
        items,
        updatedAt: Number(Date.now()),
    },
});

export const Failure = () => ({
    type: ActionTypes._FAILURE,
});

export const Invalidate = () => ({
    type: ActionTypes._INVALIDATE,
});
