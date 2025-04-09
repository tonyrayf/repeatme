"use client";

import { useState } from "react";

export default function FilterInput({ onSubmit, onClose }) {
    const [resistance, setResistance] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(resistance);
        setResistance('');
        onClose();
    };

    return (
        <div>
            <h2>Введите сопротивление фильтра</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                    placeholder="Сопротивление (Па)"
                    required
                />
                <button type="submit">Записать</button>
                <button type="button" onClick={onClose}>Закрыть</button>
            </form>
        </div>
    );
}