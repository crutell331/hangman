import React from 'react';

const WinLoss = ({ loss }) => {
    function reload() {
        window.location.reload();
    };
    return (
        <div style={styles.overlay}>
            {loss ?
                <>
                    <h2 style={styles.overlayHeader}>You Lose!</h2>
                    <h3 style={styles.overlaySubHeader} onClick={() => reload()}>Try Again?</h3>
                </>
                :
                <>
                    <h2 style={styles.overlayHeader}>You Win!</h2>
                    <h3 style={styles.overlaySubHeader} onClick={() => reload()}>Try Again?</h3>
                </>
            }

        </div>
    );
};

export default WinLoss;

const styles = {
    overlay: {
        position: "fixed",
        display: "block",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        "backgroundColor": "rgba(0,0,0,0.5)",
        zIndex: 2,
    },
    overlayHeader: {
        position: "absolute",
        top: "40%",
        left: "50%",
        fontSize: "4rem",
        color: "white",
        transform: "translate(-50%, -50%)",
    },
    overlaySubHeader: {
        position: "absolute",
        top: "50%",
        left: "50%",
        fontSize: "2.5rem",
        color: "white",
        transform: "translate(-50%, -50%)",
        cursor: "pointer"
    }
};