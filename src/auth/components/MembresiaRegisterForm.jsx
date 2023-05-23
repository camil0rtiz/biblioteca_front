import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Form, Button, Alert, ProgressBar, Card } from "react-bootstrap"
import { onAgregarUser } from "../../store/auth/userSlice"
import { CCard, CCardBody, CCardGroup } from "@coreui/react"

export const MembresiaRegisterForm = ({ goNextPage, goBackPage }) => {

    const { initialUsuario } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const { formState: { errors }, handleSubmit, setValue, clearErrors, getValues } = useForm({ defaultValues: initialUsuario })

    function onSubmit({ idMembresia }) {
        
        dispatch(onAgregarUser({ idMembresia }))
        goNextPage()

    }

    return (
        
        <CCardGroup>
            <CCard className="p-4">
                <CCardBody>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="col-md-12">
                            <ProgressBar className="mb-3" animated variant="primary" now={66.6} label={'Paso 2'} />
                            <div className="text-center">
                                <h3>Datos Membresia</h3>
                            </div>
                            <div className="row row-cols-1 row-cols-md-2 mb-3 text-center">
                                <div className="col">
                                    <Card>
                                        <Card.Header>
                                            <h4 className="my-0 fw-normal">Semestral</h4>
                                        </Card.Header>
                                        <Card.Body>
                                            <h1 className="card-title pricing-card-title">$2.500<small className="text-muted fw-light">/6 meses</small></h1>
                                            <p>Pide libros durante 6 meses pagando solo una vez</p>
                                            <Button
                                                variant="outline-success"
                                                className={`btn ${errors.idMembresia ? 'is-invalid' : ''}`}
                                                onClick={() => {
                                                    setValue('idMembresia', 2);
                                                    clearErrors('idMembresia');
                                                }}
                                                active={getValues('idMembresia') === 2}
                                            >
                                            Semestral
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="col">
                                    <Card>
                                        <Card.Header>
                                            <h4 className="my-0 fw-normal">Anual</h4>
                                        </Card.Header>
                                        <Card.Body>
                                            <h1 className="card-title pricing-card-title">$4.000<small className="text-muted fw-light">/al año</small></h1>
                                            <p>Pide libros durante 1 año pagando solo una vez</p>
                                            <Button
                                                variant="outline-danger"
                                                className={`btn ${errors.idMembresia ? 'is-invalid' : ''}`}
                                                onClick={() => {
                                                    setValue('idMembresia', 1);
                                                    clearErrors('idMembresia');
                                                }}
                                                active={getValues('idMembresia') === 1}
                                                >
                                                Anual
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </div>
                            {errors.idMembresia && (
                                <Alert key={'danger'} variant={'danger'}>
                                    {errors.idMembresia.message}
                                </Alert>
                            )}
                            <div className="d-flex justify-content-between">
                                <Button variant="danger" onClick={goBackPage}>
                                    Atrás
                                </Button>
                                <Button variant="dark" type="submit">
                                    Siguiente
                                </Button>
                            </div>
                        </div>
                    </Form>
                </CCardBody>
            </CCard>
        </CCardGroup>
        
    )
}
