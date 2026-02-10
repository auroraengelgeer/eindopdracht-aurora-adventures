export default function FormField({
                                      label,
                                      required = false,
                                      children,
                                  }) {
    return (
        <div className="field">
            <label>
                {label} {required ? "*" : ""}
            </label>
            {children}
        </div>
    );
}
