import {
  Box,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Data } from "./Utils/data";
import DataTable from "./Components/DataTable";

const App = () => {
  const [initialData, setInitialData] = useState(Data);
  const [filterLabels, setFilterLabels] = useState([]);
  const [switchState, setSwitchState] = useState({});
  const [headers, setHeaders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Dynamically set headers based on the keys of the first object in Data
    if (Data.length > 0) {
      setHeaders(Object.keys(Data[0]));
    }
  }, []);

  useEffect(() => {
    if (Data?.length) {
      const values = {};

      Data.forEach((element) => {
        Object.keys(element).forEach((key) => {
          if (key !== "id") {
            if (element[key]) {
              values[key] = values[key] || [];
              if (!values[key].includes(element[key])) {
                values[key].push(element[key]);
              }
            }
          }
        });
      });

      setFilterLabels(values);
    }
  }, [Data]);

  useEffect(() => {
    setInitialData(() => {
      return Data.filter((item) => {
        const matchesSearch = Object.values(item).some((val) =>
          String(val).toLowerCase().includes(search.toLowerCase())
        );

        const matchesFilters = Object.keys(switchState).every((key) => {
          if (switchState[key] && switchState[key].length > 0) {
            return switchState[key].includes(item[key]);
          }
          return true;
        });

        return matchesSearch && matchesFilters;
      });
    });
  }, [switchState, search]);

  const handleSwitchChange = (key, value) => (event) => {
    setSwitchState((prevState) => {
      const isChecked = event.target.checked;

      return {
        ...prevState,
        [key]: isChecked
          ? [...(prevState[key] || []), value]
          : (prevState[key] || []).filter((item) => item !== value),
      };
    });
  };

  return (
    <div className="App">
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Filter Demo
        </Typography>
      </Box>
      <Box sx={{ padding: 3 }}>
        <Grid container spacing={2} mb={3}>
          {Object.keys(filterLabels).map((key) => (
            <Grid item xs={12} sm={6} md={3} key={key}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  {key}
                </Typography>
                {filterLabels[key].map((value) => {
                  console.log("value", value, switchState[value]);
                  return (
                    <FormControlLabel
                      key={value}
                      control={
                        <Switch
                          checked={switchState[key]?.includes(value) || false}
                          onChange={handleSwitchChange(key, value)}
                          inputProps={{
                            "aria-label": `${key} ${value} switch`,
                          }}
                          color="primary"
                        />
                      }
                      label={value}
                      sx={{
                        backgroundColor: "background.paper",
                        borderRadius: 1,
                        boxShadow: 1,
                        padding: 0.5,
                        margin: 0,
                        width: "100%",
                      }}
                    />
                  );
                })}
              </Box>
            </Grid>
          ))}
        </Grid>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={search || ""}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ marginBottom: 2 }}
          />
        </Box>
        <DataTable {...{ headers, initialData }} />
      </Box>
    </div>
  );
};

export default App;
