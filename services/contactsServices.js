import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

//Повертає масив контактів
export const listContacts = async () => {
   const data = await fs.readFile(contactsPath, "utf-8");
   return JSON.parse(data);
};

//Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
export const getContactById = async (contactId) => {
   const contacts = await listContacts();
   const result = contacts.find((item) => item.id === contactId);
   return result || null;
};

//Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
export const removeContact = async (contactId) => {
   const contacts = await listContacts();
   const index = contacts.findIndex((contact) => contact.id === contactId);
   if (index === -1) {
      console.log("No contacts found");
      return null;
   }
   const [result] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return result;
};

//Повертає об'єкт доданого контакту (з id).
export const addContact = async (name, email, phone) => {
   const contacts = await listContacts();

   const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
   };
   contacts.push(newContact);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return newContact;
};

export const updateById = async (contactId, data) => {
   const contacts = await listContacts();

   const index = contacts.findIndex((contact) => contact.id === contactId);
   if (index === -1) {
      console.log("No contacts found");
      return null;
   }

   const contactToUpdate = contacts.find((contact) => contact.id === contactId);
   contacts[index] = { id, ...contactToUpdate, ...data };
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
   return contacts[index];
};
