import PropTypes from "prop-types";
import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { capitalizeFirstLetter } from "utils/common";

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  control: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  type: "text",
  disabled: false,
  readOnly: false,
  required: false,
};

function InputField(props) {
  const { name, type, disabled, control, readOnly, required } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const { error } = fieldState;

        return (
          <TextField
            {...field}
            id={name}
            type={type}
            error={!!error}
            fullWidth
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            InputProps={{
              readOnly: readOnly,
            }}
            label={capitalizeFirstLetter(name)}
            helperText={!!error ? error["message"] + " ⚠" : ""}
          />
        );
      }}
    />
  );
}

export default InputField;
