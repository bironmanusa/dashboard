import  SelectorUI  from './components/SelectorUI.tsx'
import IndicatorUI from './components/IndicatorUI.tsx'
import DataFetcher from './functions/DataFetcher';
import './App.css'
import { Grid } from '@mui/material'

function App() {

  const dataFetcherOutput = DataFetcher();

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
        <Grid container size={{ xs: 12, md: 9 }} >

          {/* Renderizado condicional de los datos obtenidos */}
          {dataFetcherOutput.loading && <p>Cargando datos...</p>}
          {dataFetcherOutput.error && <p>Error: {dataFetcherOutput.error}</p>}
          {dataFetcherOutput.data && (
          <>

          {/* Indicadores con datos obtenidos */}

          <Grid size={{ xs: 12, md: 3 }} >
            <IndicatorUI
              title='Temperatura (2m)'
              description={dataFetcherOutput.data.current.temperature_2m + " " + dataFetcherOutput.data.current_units.temperature_2m} />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <IndicatorUI
              title='Temperatura aparente'
              description={dataFetcherOutput.data.current.apparent_temperature + " " + dataFetcherOutput.data.current_units.apparent_temperature} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Velocidad del viento'
                description={dataFetcherOutput.data.current.wind_speed_10m + " " + dataFetcherOutput.data.current_units.wind_speed_10m} />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <IndicatorUI
                title='Humedad relativa'
                description={dataFetcherOutput.data.current.relative_humidity_2m + " " + dataFetcherOutput.data.current_units.relative_humidity_2m} />
            </Grid>

            </>
            )}
        </Grid>


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
