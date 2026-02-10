import { Link } from "react-router-dom";
import StatusMessage from "../StatusMessage/StatusMessage";

export default function PageState({
                                      title,
                                      message,
                                      actionTo,
                                      actionLabel,
                                      className = "",
                                  }) {
    return (
        <div className={className}>
            {title ? <h1>{title}</h1> : null}
            <StatusMessage>{message}</StatusMessage>

            {actionTo && actionLabel ? (
                <Link to={actionTo} className="button button-secondary">
                    {actionLabel}
                </Link>
            ) : null}
        </div>
    );
}
