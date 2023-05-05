import { FC, useEffect, useState } from "react";
import {  PublicKey } from "@solana/web3.js";
import Airdrop from "./Airdrop";
import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from "@mui/material";

type PhantomEvent = "disconnect" | "connect" | "accountChanged";

interface ConnectOpts {
    onlyIfTrusted: boolean;
}

interface PhantomProvider {
    connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
    disconnect: () => Promise<void>;
    on: (event: PhantomEvent, callback: (args: any) => void) => void;
    isPhantom: boolean;
}


type WindowWithSolana = Window & {
    solana?: PhantomProvider;
}



const Connect2Phantom: FC = () => {

    const [walletAvail, setWalletAvail] = useState(false);
    const [provider, setProvider] = useState<PhantomProvider | null>(null);
    const [connected, setConnected] = useState(false);
    const [pubKey, setPubKey] = useState<PublicKey | null>(null);


    useEffect(() => {
        if ("solana" in window) {
            const solWindow = window as WindowWithSolana;
            if (solWindow?.solana?.isPhantom) {
                setProvider(solWindow.solana);
                setWalletAvail(true);
                // Attemp an eager connection
                solWindow.solana.connect({ onlyIfTrusted: true });
            }
        }
    }, []);

    useEffect(() => {
        provider?.on("connect", (publicKey: PublicKey) => {
            console.log(`connect event: ${publicKey}`);
            setConnected(true);
            console.log("publicKey", publicKey?.toBase58())
            setPubKey(publicKey);
        });
        provider?.on("disconnect", () => {
            console.log("disconnect event");
            setConnected(false);
            setPubKey(null);
        });

    }, [provider]);


    const connectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log(`connect handler`);
        provider?.connect()
            .catch((err) => { console.error("connect ERROR:", err); });
    }

    const disconnectHandler: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("disconnect handler");
        provider?.disconnect()
            .catch((err) => { console.error("disconnect ERROR:", err); });
    }

    return (
        <div>
            {walletAvail ?
                <div>
                    <Button variant="contained" disabled={connected} onClick={connectHandler} sx={{ mr: 5 }}>Connect to Phantom Wallet</Button>
                    <Button variant="contained" disabled={!connected} onClick={disconnectHandler} sx={{ ml: 5 }}>Disconnect from Phantom</Button>
                    {connected ? <Typography variant="h5" sx={{ mt: 5 }}>Your public key is : {pubKey?.toBase58()}</Typography> : null}
                    {connected && pubKey ? <Airdrop pubkey={pubKey} /> : null}
                </div>
                :
                <>
                    <p>Opps!!! Phantom is not available. Go get it <a href="https://phantom.app/">https://phantom.app/</a>.</p>
                </>
            }
        </div>
    );
}

export default Connect2Phantom;