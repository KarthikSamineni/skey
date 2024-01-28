import "./App.css";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import LoginSignUpPage from "./components/login/LoginSignUpPage";
import { useEffect } from "react";

function App() {
  const supabase = createClient(
    "http://127.0.0.1:54321",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
    // {
    //   global: {
    //     headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0" }
    //   }
    // }
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const x = await supabase.from("event").select("*,event_schedule!inner(*)").eq('event_schedule.start_time', [new Date('2024-01-01T00:00:00Z'), new Date('2024-01-31T00:00:00Z')])
        const x = await supabase.from("event").select("*,event_schedule!inner(*)").lt('event_schedule.start_time', '2024-01-01T00:00:00Z').gt('event_schedule.start_time','2024-01-31T23:59:59Z');


        // .from("country").select("*,state!inner(*,city!inner(*))").or('state.city.name.eq.Hyderabad')
        // .select("*,event_languages!inner(*,country_languages!inner(*))").in('event_languages.country_languages.name',['Hindi']).in('id',['1','34']);
        console.log(x, "data from supabase");
      } catch (e) {
        console.error(e, "Error is ...");
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <LoginSignUpPage />
    </div>
  );
}

export default App;
