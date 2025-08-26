    "use client";

    import { useEffect, useState } from "react";

    export default function BMSFaultCard({fault}) {
        
    const [bmsFaults, setBmsFaults] = useState("--");

    function decodeBmsFaults(rawValue) {
        const rules = [
        { name: "Single_Cell_Overvoltage", mask: 3, divisor: 1 },
        { name: "Single_Cell_Undervoltage", mask: 12, divisor: 4 },
        { name: "High_Cell_Voltage_Difference", mask: 768, divisor: 256 },
        { name: "Discharge_Overcurrent", mask: 3072, divisor: 1024 },
        { name: "Charge_Overcurrent", mask: 12288, divisor: 4096 },
        { name: "Over_temperature", mask: 49152, divisor: 16384 },
        { name: "Under_temperature", mask: 196608, divisor: 65536 },
        { name: "Low_SOC", mask: 3145728, divisor: 1048576 },
        { name: "Internal_Comm_Fault", mask: 805306368, divisor: 268435456 },
        ];

        let active = [];
        rules.forEach((rule) => {
        const level = (rawValue & rule.mask) / rule.divisor;
        if (level > 0) {
            active.push(`${rule.name} (L${level})`);
        }
        });

        return active.length > 0 ? active.join(", ") : "✅ No Active Faults";
    }

    useEffect(() => {
        
            const bmsRaw = fault
            if (bmsRaw !== undefined && !isNaN(bmsRaw)) {
            setBmsFaults(decodeBmsFaults(Number(bmsRaw)));
            } else {
            setBmsFaults("--");
            }
    }, [fault]);

    

    return (
    <div className="bg-gray-800/70 backdrop-blur-md border  border-gray-700 rounded-2xl p-6 ">
                <h3 className="text-xl font-semibold text-white mb-2">BMS Faults</h3>
        <div className="text-[#007acc] text-sm font-medium break-words">
            {bmsFaults}
        </div>
        </div>
    );
    }


