import React from 'react'
import { Card, Form, Button } from "react-bootstrap";
import { MessageSquareText } from "lucide-react";
import { useState } from "react";
import { instructionOptions } from '../../utils/data';

const SpecialInstructions = ({ register, setValue }) => {

    const [selected, setSelected] = useState([]);

    const handleChipClick = (instruction) => {
        let updatedInstructions;

        if (selected.includes(instruction)) {
            // Remove chip
            updatedInstructions = selected.filter((item) => item !== instruction);
        } else {
            // Add chip
            updatedInstructions = [...selected, instruction];
        }
        setSelected(updatedInstructions);

        // Store selected chips in react-hook-form
        setValue("specialInstructions", updatedInstructions);
    };
    return (
        <Card className="shadow-sm rounded-4 border-0 mb-4 p-3">
            <Card.Body>
                <div className="d-flex align-items-center mb-3">
                    <MessageSquareText size={26} className="me-2 text-primary" />
                    <h4 className="mb-0">Special Instructions</h4>
                </div>

                <p className="text-muted mb-4">
                    Help our home chef prepare your meal exactly the way you like it.
                </p>

                <div className="d-flex flex-wrap gap-2">
                    {instructionOptions.map((instruction) => (
                        <Button
                            key={instruction}
                            type="button"
                            size='sm'
                            variant={
                                selected.includes(instruction)
                                    ? "warning"
                                    : "outline-secondary"
                            }
                            onClick={() =>
                                handleChipClick(instruction)
                            }
                        >
                            {instruction}
                        </Button>
                    ))}
                </div>

                <input type="hidden" {...register("specialInstructions")} />

                {selected.includes("Other") && (
                    <Form.Group className="mt-4">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            style={{ resize: "none" }}
                            placeholder="Any additional preferences..."
                            {...register("otherInstruction")}
                        />
                    </Form.Group>
                )}
            </Card.Body>
        </Card>
    )
}

export default SpecialInstructions