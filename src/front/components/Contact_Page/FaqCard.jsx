import { useState } from 'react';

export const FaqCard = () => {

    return (
        <div className="card faq_card">
            <div className="card-body">
                <h3 className="card-title faq_card_title px-3 mt-3">FAQ</h3>
                <p className="card-text fs-5 lh-1 p-3">
                    Have questions about how our service works? 
                    Find answers to the most common topics like account setup, privacy, and more.
                </p>
                <a href="/faq" className="btn faq_card_btn fw-bold m-2">Find more information</a>
            </div>
        </div>
    );
}