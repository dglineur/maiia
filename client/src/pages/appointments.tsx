import AppointmentForm from 'components/AppointmentForm';
import AppointmentList from 'components/AppointmentList';
import Section from 'components/Section';
import AllTasks from 'components/AllTasks';
import { Hidden, Typography } from '@material-ui/core';

const AppointmentsPage = () => {
  return (
    <div className="appointment page">
      <Hidden smDown>
        <Typography variant={'h1'}>Appointments</Typography>
      </Hidden>
      <Hidden mdUp>
        <Typography variant={'h3'}>Appointments</Typography>
      </Hidden>
      <Section
        name="instructions"
        title="Instructions"
        className="instructions"
      >
        <p>
          To book an appointment, we have to set the following required
          informations: the practitioner, the patient and date.
        </p>
        <p>
          In first you have to create the appointment form. You are free to use
          the validation form that you want like Formik or React-hook-form.
        </p>
        <p>
          In the second time, you will show the list of all created appointments
          on the right side
        </p>
        <p>
          We don't have mock ups, you have to design your own solution and
          propose a simple workflow for users. It also should be responsive.
        </p>
        <p>
          We expect you to implement two bonus features: you can choose among
          the suggested features in the bonus section or choose to implement one
          of your choice.
        </p>
        <p>
          While selecting a practitioner in the dropdown list, the
          availabilities must be generated and displayed in the front. To create
          an appointment, you must select an availability and click on the
          button “create appointment”. An endpoint must be created in the back
          to create the appointment
        </p>
        <p>
          Every practitioner has many time slots which represent his interval of
          work time. The duration of an availability for an appointment is 15
          minutes, so for example if the practitioner has a one hour time slot,
          this will generate 4 availabilities of 15 minutes. If the practitioner
          add an appointment to his agenda that will reduce his availabilities.
        </p>
        <p>
          In the class ProAvailibilityServiceTest, there is some use cases of
          handling availabilities, you can check your implementation by running
          the tests.
        </p>
      </Section>
      <AllTasks className="goals" />
      <div className="structurePage">
        <Section
          name="appointment-form"
          title="Appointment Form"
          className="appointment__form"
        >
          <AppointmentForm />
        </Section>
        <Section
          name="appointment-list"
          title="Appointment List"
          className="appointment__list"
        >
          <AppointmentList />
        </Section>
      </div>
    </div>
  );
};

AppointmentsPage.pageTitle = 'Appointments';
AppointmentsPage.pageSubtitle = "Let's get to work 👩‍💻";

export default AppointmentsPage;
