import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';
import { DetailedFilter } from './DetailedFilter';

export function Modal({ isOpen, closeModal }) {

    return (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <Dialog.Title className="text-lg font-bold">Set Your Filters</Dialog.Title>
                <Dialog.Description className="mt-2">
                    Find your dream property with our advanced filters.
                </Dialog.Description>

                <DetailedFilter />

                <div className="mt-6 flex justify-end space-x-2">
                    <button
                        onClick={closeModal}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Submit
                    </button>
                    <button
                        onClick={closeModal}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </Dialog.Panel>
        </Dialog>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func
}
