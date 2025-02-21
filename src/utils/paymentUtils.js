export const fetchUpcomingPayments = async () => {
    // Mock implementation of fetching upcoming payments
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, amount: 5000, dueDate: '2024-01-15', status: 'pending' },
                { id: 2, amount: 3000, dueDate: '2024-02-15', status: 'pending' }
            ]);
        }, 1000);
    });
};
