import { Box, Grid } from "@mui/material";
import FormStep from "./parts/FormStep";
import TournamentOrganizerForm from "./TournamentOrganizerForm";

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
            2
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
