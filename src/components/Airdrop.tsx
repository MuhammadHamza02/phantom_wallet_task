import { Typography } from "@mui/material";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { FC, useEffect, useRef, useState } from "react";

interface AirdropProps {
    pubkey: PublicKey;
}

const network = "testnet";

const Airdrop: FC<AirdropProps> = ({ pubkey }) => {

    const connection = useRef(new Connection(clusterApiUrl(network)));

    const [balance, setBalance] = useState(0);

    useEffect(() => {
        console.log(pubkey);
        connection.current.getBalance(pubkey).then(setBalance);
    }, [pubkey]);
    console.log("balance", balance);

    let num = balance;
    let digitSum = 0;

    while (num > 0 || digitSum > 9) {
        if (num === 0) {
            num = digitSum;
            digitSum = 0;
        }
        digitSum += num % 10;
        num = Math.floor(num / 10);
    }
    console.log(digitSum);

    return (
        <div>
            <p className="p15">&nbsp;</p>
            <Typography variant="h4" sx={{ mt: 5 }}>Your current balance is:  <Typography variant="h3" sx={{ mt: 5 }}>{digitSum}</Typography> </Typography>
        </div>
    );
}

export default Airdrop;