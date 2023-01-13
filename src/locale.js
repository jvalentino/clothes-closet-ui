import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
    en:{
      bannerFollowUs: "Follow Us On Facebook",
      appointmentScheduling: "Appointment Scheduling",
      appointmentPurpose: `The purpose of this form is for a parent or guardian to schedule an appointment
        at the Clothes Closet for one or more HEB ISD students. To be eligible students must
        be on an HEB ISD discount meal plan as verified by their Student ID.`,

    },
    es: {
      bannerFollowUs: "Síguenos en Facebook",
      appointmentScheduling: "Programación de citas",
      appointmentPurpose: `El propósito de este formulario es que un padre o tutor programe una cita
      en el armario de ropa para uno o más estudiantes de HEB ISD. Para ser elegible, los estudiantes deben
      estar en un plan de comidas con descuento de HEB ISD según lo verifique su identificación de estudiante.`,
    }
   });


export default strings;
