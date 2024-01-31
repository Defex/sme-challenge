import { Box, Grid, Stack, Typography } from "@mui/material";
import FormStep from "./parts/FormStep";
import TournamentOrganizerForm from "./TournamentOrganizerForm";
import { useState } from "react";
import PrizeWinnerUserForm, { PrizeWinner } from "./PrizeWinnerUserForm";

// This layout is pretty neat,
// It allows use to start making a whole page
// and we could replace each of the form components with additional container components
// if some had additional business logic requirements
export default function PriceRequestPage() {
  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <FormStep number={1} title="Turnyro rengėjas">
            <TournamentOrganizerForm
              onSubmit={(formdata) => console.log(formdata)}
            />
          </FormStep>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormStep number={2} title="Prizininkų informacija">
            <PrizeWinnersForm />
          </FormStep>
        </Grid>
        <Grid item xs={12} md={6}>
          <FormStep number={3} title="Prizai">
            3
          </FormStep>
        </Grid>
      </Grid>
    </Box>
  );
}

// Technically not a form, I had some more stuff in mind like connecting with BE - or at least a pretend
// but realized it would take a bit too much time, and it's out of the scope
// the inclantion for that was because of what we dicussed during the interview on how the forms are generated
function PrizeWinnersForm() {
  const [winners, setWinners] = useState<PrizeWinner[]>([]);

  return (
    <Stack spacing={2}>
      <Stack spacing={1}>
        {winners.map((w, i) => (
          // if possible would use a unique value or combo from the PrizeWinner, but for now i is enough
          <Box key={i}>
            <Typography>
              {`Vardas: ${w.fullName}, Suma: ${w.prizeSum}, fondas: ${
                w.additionalFundId
                  ? `Papildomas - ${w.additionalFundId}`
                  : "Pagrindinis"
              }`}
            </Typography>
          </Box>
        ))}
      </Stack>

      <PrizeWinnerUserForm
        onSubmit={(winner, resetForm) => {
          setWinners((p) => [...p, winner]);
          resetForm();
        }}
      />
    </Stack>
  );
}
