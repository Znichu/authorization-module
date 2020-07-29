let initialState: InitialState = {
    success: null,
    testEmail: "test@test.by"
}

type InitialState = {
    success: null | boolean
    testEmail: string
}

export const forgotReducer = (state: InitialState = initialState, action: any) => {
    return state
}