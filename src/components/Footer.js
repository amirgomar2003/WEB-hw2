import React from "react";

function Footer({ shapeCounts }) {
    return (
        <footer className="footer">
            <div className="footer-shape">
                <div className="shape-icon circle" /> {shapeCounts.circle || 0}
            </div>
            <div className="footer-shape">
                <div className="shape-icon square" /> {shapeCounts.square || 0}
            </div>
            <div className="footer-shape">
                <div className="shape-icon triangle" /> {shapeCounts.triangle || 0}
            </div>
        </footer>
    );
}

export default Footer;
