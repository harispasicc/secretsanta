import React,{useState,useEffect} from "react";
import {Typography,Button,Grid,Box,CardContent,Card} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SecretSantaPairs = () => {
  const [secretData, setSecretData] = useState({});
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('secretPairs'));
    if (data) {
      setSecretData(data);
    }
  }, []);
  
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/secret-santa");
  };

  return (
    <Box className='parentalMode' sx={{ backgroundColor: '#DF0000', height:'90vh'}}>
         <Box className="titleBox">
      <Typography variant="h4" color='white'>
        Secret Santa
      </Typography>
      </Box>
          <Box sx={{marginLeft:'60px', marginBottom:'60px'}}>
            <Typography className="resultitle" variant="h6" color='white'>
              Number of participants: {secretData.participants}
            </Typography>
            <Typography className="resultitle" variant="h6" color='white'>
              Budget: {secretData.maxPrice} BAM per person
            </Typography>
          </Box>
          <Box sx={{textAlign:'center'}}>
                <Grid container sx={{ justifyContent:'center' }}>
            {Object.keys(secretData).length && (secretData.pairs).map((card, index) => (
              <Grid item md={3} key={index}>
                <Card sx={{margin:'20px', minWidth:'140px'}}>
                  <CardContent>
                    <Typography>{card['0']}</Typography>
                    <Typography >{card['1']}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Box sx={{textAlign:'center', marginTop:'40px'}}>
          <Button type="submit" variant="contained" color="success" size='large' onClick={handleBack}>
            Go back
          </Button>
          </Box>
        </Box>
      </Box>
  );
};

export default SecretSantaPairs;
