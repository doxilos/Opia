import React from "react"
import { Paper, Typography, Box } from "@mui/material"
import address from "../../assets/address.png"

export const Donate = () => {
    return (
        <Paper sx={{ textAlign: "center" }}>
            <Box sx={{ p: 2 }}>
                <Typography variant="h6">
                    Consider Donating via Ethereum.
                </Typography>
                <Typography variant="h6">
                    0x3BbE6b998D130aE9C1cfF19D069E69Dcd672332d
                </Typography>
                <img
                    src={address}
                    alt=""
                    style={{ width: "350px", marginTop: "30px" }}
                />
            </Box>
        </Paper>
    )
}
