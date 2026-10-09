import is_validated from "../images/is-validated.svg";
import no_validated from "../images/no-validated.svg";

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
            <img src={is_validated} alt={"Success"} />

            <p className="tooltip__message">¡Correcto! Ya estás registrado.</p>
          </div>
        </>
      ) : (
        <>
          <div className="tooltip__content">
            <img src={no_validated} alt={"Error"} />

            <p className="tooltip__message">
              Uy, algo salió mal. Por favor, inténtalo de nuevo.
            </p>
          </div>
        </>
      )}
    </>
  );
}
