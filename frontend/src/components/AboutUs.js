import React from 'react';
import { Box, CardMedia, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import tree from '../assets/images/christmas_tree.png'
import santa from '../assets/images/santa-claus.png';
import gift from '../assets/images/gift.png';
import styled from '@emotion/styled';

const StyledStack = styled(Stack)({
  display: "flex",
  flexDirection: "row",
  justifyContent: 'space-evenly'
});
const StyledBox = styled(Box)({
  textAlign: 'justify',
  width: "250px",
  marginRight: "auto",
});
const StyledBox2 = styled(Box)({
  display: "flex",
  flexDirection: 'column',
  alignItems: 'center',
  paddingLeft: 1,
  paddingBottom: 1
});

const AboutUs = () => {
  return (
    <Box>
      <StyledStack spacing={1} >
        <StyledBox2  >
          <Typography variant="h6" p={2}>
            Save the trees
          </Typography>
          <CardMedia
            component="img"
            sx={{ width: 70, ml: 15 }}
            image={tree}
            alt="tree"
          />
        </StyledBox2>
        <StyledBox variant="caption" pt={6}>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour look even slightly believable.
        </StyledBox>
      </StyledStack>
      <StyledStack spacing={1}>
        <StyledBox2 >
          <Typography variant="h6" p={2}>
            Help Santa
          </Typography>
          <CardMedia
            component="img"
            sx={{ width: 80, ml: 15 }}
            image={santa}
            alt="tree"
          />
        </StyledBox2>
        <StyledBox variant="caption" pt={6} >
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't.
        </StyledBox>
      </StyledStack>
      <StyledStack spacing={2} >
        <StyledBox2>
          <Typography variant="h6" p={2}>
            Gift a gift
          </Typography>
          <CardMedia
            component="img"
            sx={{ width: 80, ml: 15 }}
            image={gift}
            alt="tree"
          />
        </StyledBox2>
        <StyledBox variant="caption" pt={5}>
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look.
        </StyledBox>
      </StyledStack>
    </Box>
  )
}
export default AboutUs
