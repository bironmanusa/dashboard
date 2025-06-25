import  SelectorUI  from './components/SelectorUI.tsx'
import './App.css'
import { Grid } from '@mui/material'

function App() {

  return (
    <>
      <div>
        <h1>Bienvenido al Dashboard</h1>
      </div>
      <Grid container spacing={5} justifyContent="center" alignItems="Center">

         {/* Encabezado */}
         <Grid size={{ xs: 12 }}>Elemento: Encabezado</Grid>

         {/* Alertas */}
         <Grid size={{ xs: 12 }}>Elemento: Alertas</Grid>

         {/* Selector */}
         <Grid size={{ xs: 12, md: 3}}><SelectorUI /></Grid>

         {/* Indicadores */}
         <Grid size={{ xs: 12, md: 9}}>Elemento: Indicadores</Grid>

         {/* Gráfico */}
         <Grid
          sx={{ dispaly: { xs: "none", md: "block" } }} 
          size={{ xs: 12, md: 6}}>
            Elemento: Gráfico
         </Grid>

         {/* Tabla */}
         <Grid size={{ xs: 12, md: 6}}>Elemento: Tabla</Grid>

         {/* Información adicional */}
         <Grid size={{ xs: 12, md: 12}}>Elemento: Información adicional</Grid>

      </Grid>
    </>
  )
}

export default App
