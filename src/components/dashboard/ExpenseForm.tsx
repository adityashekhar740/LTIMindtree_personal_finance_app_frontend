import React, { useState } from 'react';
import { DollarSign, Calendar, Tag, X, ChevronDown } from 'lucide-react';
import { currencies, convertCurrency } from '../../utils/currency';
import { categories } from '../../data/categories';
import { isValidDate } from '../../utils/dateUtils';

interface ExpenseFormProps {
  onClose: () => void;
  onSubmit: (expense: any) => void;
}

export default function ExpenseForm({ onClose, onSubmit }: ExpenseFormProps) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [dateError, setDateError] = useState('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!isValidDate(selectedDate)) {
      setDateError('Future dates are not allowed');
      setDate('');
    } else {
      setDateError('');
      setDate(selectedDate);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountInINR = convertCurrency(parseFloat(amount), currency, 'INR');
    onSubmit({
      id: Date.now().toString(),
      amount: amountInINR,
      originalAmount: parseFloat(amount),
      originalCurrency: currency,
      category,
      date,
      description
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass-card rounded-xl p-8 w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">Add New Expense</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10 block w-full rounded-lg glass-input py-3 px-4 text-white border-blue-500/20 focus:border-blue-500/40 transition-colors"
                  required
                />
              </div>
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-300 mb-2">Currency</label>
              <div className="relative">
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="block w-full rounded-lg glass-input py-3 px-4 text-white border-blue-500/20 focus:border-blue-500/40 transition-colors appearance-none"
                >
                  {currencies.map((curr) => (
                    <option
                      key={curr.code}
                      value={curr.code}
                      className="bg-dark-900 text-white"
                    >
                      {curr.symbol} {curr.code}
                    </option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-blue-400" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.name)}
                  className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
                    category === cat.name
                      ? 'bg-blue-500/20 text-white'
                      : 'glass-input text-gray-400 hover:text-white hover:bg-blue-500/10'
                  }`}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="text-sm font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-5 w-5" />
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                max={new Date().toISOString().split('T')[0]}
                className="pl-10 block w-full rounded-lg glass-input py-3 px-4 text-white border-blue-500/20 focus:border-blue-500/40 transition-colors"
                required
              />
            </div>
            {dateError && <p className="text-red-400 text-sm mt-1">{dateError}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full rounded-lg glass-input py-3 px-4 text-white border-blue-500/20 focus:border-blue-500/40 transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium text-lg"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}