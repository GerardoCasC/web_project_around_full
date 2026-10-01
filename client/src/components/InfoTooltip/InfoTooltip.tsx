type InfoTooltipProps = {
  isValidated: boolean;
};
export default function InfoTooltip(
  props: InfoTooltipProps,
): React.JSX.Element {
  const isValidated = props.isValidated;
  return (
    <>
      {isValidated ? (
        <>
          <div className="tooltip__content">
            <img src={"../src/images/is-validated.svg"} alt={"Sucess"} />

            <p className="tooltip__message">¡Correcto! Ya estás registrado.</p>
          </div>
        </>
      ) : (
        <>
          <div className="tooltip__content">
            <img src={"../src/images/no-validated.svg"} alt={"Error"} />

            <p className="tooltip__message">
              Uy, algo salió mal. Por favor, inténtalo de nuevo.
            </p>
          </div>
        </>
      )}
    </>
  );
}
