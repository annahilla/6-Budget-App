

const InfoModal = ({isOpen} : {isOpen: boolean}) => {

    return (
        isOpen && (
            <div className="absolute flex flex-col items-center justify-center">
            <h5 className="font-bold text-2xl text-center lg:text-left">Número de llenguatges</h5>
            <p className="text-xl font-light">Afegeix els llenguatges que tindrà el teu projecte.
            <br /> El cost de cada llenguatge és de 30€.</p>
        </div>
        )
    )
}

export default InfoModal;