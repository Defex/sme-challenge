import {
  Box,
  Button,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import FormActions from "./parts/FormActions";

const radioOptions = {
  simple: "Paprastas",
  advanced: "Su medaliais",
};

interface FormData {
  firstName: string;
  lastName: string;
  companyNumber: string;
  tournamentType: string;
}

export default function TournamentOrganizerForm(props: {
  onSubmit: (formData: FormData) => void;
}) {
  const [radioValue, setRadioValue] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");

  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});

  const handleSubmit = () => {
    // this is basic form validation for this scenario it's enough
    // if we can keep it simple it's best to do so
    // different use cases might require the use of external libraries,
    // or writing validation, where one form value depends on a different form value
    // also we might want to display some specific errors from the backend f.e. is data mistmatch is found
    // then this form would include apiError props, loading state and be wrapped on a container component

    let errors = {};

    if (radioValue === "") {
      errors = { ...errors, radioValue: "Privaloma pasirinkti turnyro tipą" };
    }

    if (firstName === "") {
      errors = {
        ...errors,
        firstName: "Rengėjo vardo laukas negali būti tuščias",
      };
    }

    if (firstName === "") {
      errors = {
        ...errors,
        lastName: "Rengėjo pavardės laukas negali būti tuščias",
      };
    }

    if (firstName === "") {
      errors = {
        ...errors,
        companyNumber: "Įmonės kodo laukas negali būti tuščias",
      };
    }

    const keys = Object.keys(errors);

    if (keys.length > 0) {
      setFormErrors(errors);
      return;
    }

    props.onSubmit({
      firstName,
      lastName,
      companyNumber,
      tournamentType: radioValue,
    });
  };

  const handleResetForm = () => {
    setFormErrors({});
    setCompanyNumber("");
    setFirstName("");
    setLastName("");
    setRadioValue("");
  };

  return (
    <Box
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      onReset={(e) => {
        e.preventDefault();
        handleResetForm();
      }}
    >
      <Stack spacing={2} direction="column">
        <Box>
          <Typography variant="h3" fontSize={18}>
            Rengėjo duomenys
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Vardas"
                variant="standard"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                helperText={formErrors["firstName"] || ""}
                error={!!formErrors["firstName"]}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <TextField
                fullWidth
                label="Pavardė"
                variant="standard"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                helperText={formErrors["lastName"] || ""}
                error={!!formErrors["lastName"]}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="h3" fontSize={18}>
            Įmonės duomenys
          </Typography>
          <Grid container>
            <Grid item xs={12} md={12} lg={8}>
              <TextField
                fullWidth
                label="Įmonės kodas"
                variant="standard"
                value={companyNumber}
                onChange={(e) => setCompanyNumber(e.target.value)}
                helperText={formErrors["companyNumber"] || ""}
                error={!!formErrors["companyNumber"]}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Typography variant="h3" fontSize={18}>
            Prizų steigimo tipas
          </Typography>
          <Box>
            <RadioGroup
              value={radioValue}
              onChange={(e) => setRadioValue(e.target.value)}
            >
              {Object.entries(radioOptions).map(([k, v]) => (
                <FormControlLabel
                  key={k}
                  value={k}
                  control={<Radio />}
                  label={v}
                />
              ))}
            </RadioGroup>

            {formErrors["radioValue"] && (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {formErrors["radioValue"]}
              </FormHelperText>
            )}
          </Box>
        </Box>

        <FormActions>
          <Button variant="contained" color="secondary" type="reset">
            Atstatyti
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Patvirtinti
          </Button>
        </FormActions>
      </Stack>
    </Box>
  );
}
