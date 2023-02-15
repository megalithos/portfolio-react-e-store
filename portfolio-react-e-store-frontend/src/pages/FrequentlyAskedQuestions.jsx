import { Container } from 'react-bootstrap';

const FrequentlyAskedQuestions = () => {
    const FrequentlyAskedQuestionItem = ({question, answer}) => {
        return (
            <div className='mb-3'>
                <h4>{question}</h4>
                <p>{answer}</p>
            </div>
        );
    }

    return (
        <Container>
            <FrequentlyAskedQuestionItem
                question='How can I pay for my order?'
                answer='We accept a variety of payment methods including credit/debit cards, PayPal, and bank transfers. You can choose your preferred payment method during checkout.'
            />
            <FrequentlyAskedQuestionItem
                question='Do you offer international shipping?'
                answer='Yes, we offer international shipping to most countries. Shipping fees and delivery times vary depending on your location. You can view shipping options and prices during checkout.
                '
            />
            <FrequentlyAskedQuestionItem
                question='What is your return policy?'
                answer='We offer a 30-day return policy for most products. If you are not satisfied with your purchase, you can return it for a full refund or exchange. Some products may have different return policies, so please check the product page for details.'
            />
            <FrequentlyAskedQuestionItem
                question='Do you offer warranties for your products?'
                answer="Yes, most of our products come with manufacturer warranties. Warranty details vary depending on the product, so please check the product page for details. If you have any questions about a specific product's warranty, please contact our customer service team."
            />
            <FrequentlyAskedQuestionItem
                question='How can I track my order?'
                answer='You can track your order by logging into your account on our website and viewing the order status. Once your order has been shipped, you will also receive a tracking number via email that you can use to track your package. If you have any questions about the status of your order, please contact our customer service team.'
            />
        </Container>
    );
}

export default FrequentlyAskedQuestions