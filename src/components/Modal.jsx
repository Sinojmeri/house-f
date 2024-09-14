import PropTypes from 'prop-types';
import { Dialog } from '@headlessui/react';

export function Modal({ isOpen, closeModal, title, description, children }) {

    return (
        <Dialog open={isOpen} onClose={closeModal} className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <Dialog.Panel className="bg-white p-6 rounded shadow-lg max-w-md w-full">
                <Dialog.Title className="text-lg font-bold">{title}</Dialog.Title>
                <Dialog.Description className="mt-2">
                    {description}
                </Dialog.Description>

                {children}
                
            </Dialog.Panel>
        </Dialog>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node.isRequired,
}
