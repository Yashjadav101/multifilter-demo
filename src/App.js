import { useState, useEffect } from "react";
import { Data } from "./Utils/data";

const App = () => {
  const [initialData, setInitialData] = useState(Data);
  const [filterLabels, setFilterLabels] = useState([]);

  useEffect(() => {
    if (Data?.length) {
      setFilterLabels(() => {
        const label = new Set([]);
        Data?.forEach((element) => {
          Object.keys(element)?.forEach((item) => {
            if (item !== "id") {
              label.add(item);
            }
          });
        });
        return [...label];
      });
    }
  }, []);

  useEffect(() => {
    if (filterLabels?.length) {
      let labelValues = {};
      filterLabels?.forEach((ele) => {
        console.log("ele", ele);
        Data.forEach((element) => {
          console.log("first", element[ele]);
          if (element[ele])
            labelValues[ele] = [...(labelValues[ele] || []), element[ele]];
        });
      });
      console.log("labelValues", labelValues);
    }
  }, [filterLabels]);

  console.log("initialData", initialData, filterLabels);
  return <div className="App"></div>;
};

export default App;
