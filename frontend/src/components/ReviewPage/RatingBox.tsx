import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';


const RatingBox = () => {
  console.log()
  return (
    <>
      <Stack spacing={1}>
        <Rating name="size-medium" defaultValue={0} />
      </Stack>
    </>
  )
}

export default RatingBox;