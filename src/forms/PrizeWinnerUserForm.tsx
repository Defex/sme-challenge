import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import FormActions from "./parts/FormActions";

export interface PrizeWinner {
  fullName: string;
  prizeSum: number;
  additionalFundId?: string;
}

const additionalfoundations = [
  {
    label: "Kęstučio žygių savąnorystės fondas",
    value: "FUND-KET-305",
    description:
      "Fondas kuriame, surinkti 10% pinigų už žygio išlaidas ..aI takes over...",
  },
  {
    label: "Žygimanto ūkio ir bičių priežiūros fondas",
    value: "FUND-UNK-1304",
    description: "I'm sorry, but this can't...",
  },
];

export default function PrizeWinnerUserForm(props: {
  onSubmit: (formValues: PrizeWinner, resetForm: () => void) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [prizeSum, setPrizeSum] = useState("0");
  const invalidPrizeSumError = isNaN(parseFloat(prizeSum))
    ? "Suma turi būti skaitinė vertinė"
    : "";
  const [fromAdditionalFoundation, setFromAdditionnalFoundation] =
    useState(false);

  const [additionalFoundation, setAdditionFoundation] = useState("");

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const resetForm = () => {
    setFullName("");
    setPrizeSum("0");
    setFromAdditionnalFoundation(false);
    setAdditionFoundation("");
  };

  const handleSubmit = () => {
    if (invalidPrizeSumError) {
      return;
    }

    let errors = {};

    if (fullName === "") {
      errors = { ...errors, fullName: "Laukas negali būti tuščias" };
    }

    if (prizeSum === "0") {
      errors = { ...errors, prizeSum: "Prizinė suma negali būti 0" };
    }

    if (fromAdditionalFoundation === true && !additionalFoundation) {
      errors = {
        ...errors,
        additionalFoundation: "Privalote pasirinkti, bent vieną fondą.",
      };
    }

    const keys = Object.keys(errors);

    if (keys.length > 0) {
      setErrors(errors);
      return;
    }

    props.onSubmit(
      {
        fullName,
        prizeSum: parseFloat(prizeSum),
        additionalFundId: additionalFoundation || undefined,
      },
      resetForm
    );
  };

  return (
    <Paper
      elevation={5}
      sx={{ padding: 2 }}
      component={"form"}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Stack spacing={2}>
        <TextField
          label="Vardas, Pavardė"
          fullWidth
          variant="filled"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          helperText={errors["fullName"]}
          error={!!errors["fullName"]}
        />
        <TextField
          type="number"
          label="Pelnyta suma, EUR"
          value={prizeSum}
          onChange={(e) => setPrizeSum(e.target.value)}
          helperText={invalidPrizeSumError || errors["prizeSum"]}
          error={!!invalidPrizeSumError || !!errors["prizeSum"]}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={fromAdditionalFoundation}
              onChange={(e) => setFromAdditionnalFoundation(e.target.checked)}
            />
          }
          label="Su papildomo fondo lėšomis"
        />
        {fromAdditionalFoundation && (
          <>
            <Select
              value={additionalFoundation}
              onChange={(e) => setAdditionFoundation(e.target.value)}
            >
              {additionalfoundations.map((f) => (
                <MenuItem key={f.value} value={f.value}>
                  {f.label}
                </MenuItem>
              ))}
            </Select>
            {errors["additionalFoundation"] && (
              <FormHelperText sx={{ color: "red" }}>
                {errors["additionalFoundation"]}
              </FormHelperText>
            )}
          </>
        )}

        <FormActions>
          <Button
            variant="contained"
            size="small"
            color="primary"
            type="submit"
          >
            Pridėti
          </Button>
        </FormActions>
      </Stack>
    </Paper>
  );
}
