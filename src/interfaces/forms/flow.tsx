export interface IFormsFlow {
    id: string
    component: React.ReactElement
    nextPage?: string
    backPage?: string
    customButtonHandling?: boolean
}