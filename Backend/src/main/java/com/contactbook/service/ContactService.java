package com.contactbook.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.contactbook.exception.ContactNotFoundException;
import com.contactbook.model.Contact;
import com.contactbook.repository.ContactRepository;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    public List<Contact> searchByName(String name) {
        return contactRepository.findByNameContainingIgnoreCase(name.trim());
    }

    public Contact addContact(Contact contact) {
        contact.setId(null);
        return contactRepository.save(contact);
    }

    public Contact updateContact(Long id, Contact details) {
        Contact contact = contactRepository.findById(id)
                .orElseThrow(() -> new ContactNotFoundException(id));

        contact.setName(details.getName());
        contact.setPhone(details.getPhone());
        contact.setEmail(details.getEmail());
        return contactRepository.save(contact);
    }

    public void deleteContact(Long id) {
        if (!contactRepository.existsById(id)) {
            throw new ContactNotFoundException(id);
        }
        contactRepository.deleteById(id);
    }
}
