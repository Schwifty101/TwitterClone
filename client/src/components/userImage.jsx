import { Box } from '@mui/material'

const UserImage = ({ image, size="60px" }) => {
    return (
        <Box
            component="img"
            width={size}
            height={size}
            src={image}
        >
            <img
                src={`http://localhost:3001/public/assets/${image}`}
                alt="User Profile Picture"
                style={{ objectFit: "cover", borderRadius: "50%" }}
                width={size}
                height={size}

            />

        </Box>
    );
}

export default UserImage;
