import { Badge } from '../../badge/badge.component.js';
import { Button } from '../../button/button.component.js';
import { HouseDollarIcon } from '../../icon/index.js';
import { AdvancedColumnProps } from '../advanced-table.types.js';

export type Person = {
  id: string;
  name: string;
  dateOfBirth: string;
  status: string;
  email: string;
  gender: string;
  address: string;
  expandedContent?: React.ReactNode;
  firstName?: string;
  lastName?: string;
};

export const columnsExample: AdvancedColumnProps<Person>[] = [
  {
    key: 'name',
    title: 'Name',
    cell: ({ row }) => (
      <div className="typography-body-10 flex items-center gap-2 text-text">
        <HouseDollarIcon size={'small'} look="outlined" color={'borderDark'} />
        {row.original.name}
      </div>
    ),
  },
  {
    key: 'dateOfBirth',
    title: 'Date of Birth',
  },
  {
    key: 'status',
    title: 'Status',
    cell: ({ row }) => (
      <Badge color="info" soft>
        {row.original.status}
      </Badge>
    ),
  },
  {
    key: 'email',
    title: 'Email',
    cell: ({ row }) => (
      <Button look="link" size={'small'}>
        {row.original.email}
      </Button>
    ),
  },
  {
    key: 'gender',
    title: 'Gender',
  },
  {
    key: 'address',
    title: 'Address',
    cell: ({ row }) => {
      return <div className="text-right whitespace-nowrap">{row.original.address}</div>;
    },
  },
];

export const dataExample: Person[] = Array.from({ length: 50 }, (_, i) => {
  const firstNames = [
    'Alex',
    'Morgan',
    'Taylor',
    'Jordan',
    'Casey',
    'Riley',
    'Jamie',
    'Cameron',
    'Drew',
    'Skyler',
    'Quinn',
    'Harper',
    'Finley',
    'Rowan',
    'Sawyer',
    'Peyton',
    'Dakota',
    'Avery',
    'Emerson',
    'Reese',
    'Blake',
    'Hayden',
    'Jesse',
    'Kendall',
    'Logan',
    'Micah',
    'Phoenix',
    'River',
    'Sage',
    'Shiloh',
    'Tatum',
    'Tristan',
    'Winter',
    'Zion',
    'Remy',
    'Lennon',
  ];
  const lastNames = [
    'Lee',
    'Kim',
    'Patel',
    'Singh',
    'Chen',
    'Garcia',
    'Martinez',
    'Lopez',
    'Gonzalez',
    'Perez',
    'Sanchez',
    'Ramirez',
    'Torres',
    'Nguyen',
    'Wong',
    'Khan',
    'Ali',
    'Hussain',
    'Smith',
    'Jones',
    'Brown',
    'Williams',
    'Taylor',
    'Davies',
    'Evans',
    'Thomas',
    'Roberts',
    'Johnson',
    'Walker',
    'Wright',
    'Clark',
    'Lewis',
    'Young',
    'King',
    'Scott',
    'Green',
  ];
  const genders = ['Male', 'Female', 'Other'];
  const statusCodes = [
    'A123',
    'B456',
    'C789',
    'D012',
    'E345',
    'F678',
    'G901',
    'H234',
    'I567',
    'J890',
    'K123',
    'L456',
    'M789',
    'N012',
    'O345',
    'P678',
    'Q901',
    'R234',
    'S567',
    'T890',
    'U123',
    'V456',
    'W789',
    'X012',
    'Y345',
    'Z678',
  ];
  const streets = [
    'Main St',
    'Oak Ave',
    'Construction Rd',
    'Fantasy Rd',
    'Comic St',
    'Adventure Ave',
    'Space St',
    'Stealth Blvd',
    'Tomb St',
    'Mushroom Ave',
    'Castle Rd',
    'Hyrule St',
    'River Rd',
    'Sunset Blvd',
    'Maple St',
    'Elm St',
    'Cedar Ave',
    'Pine Rd',
    'Birch St',
    'Spruce Ave',
    'Willow Rd',
    'Chestnut St',
    'Ash Ave',
    'Poplar Rd',
    'Sycamore St',
    'Magnolia Ave',
    'Dogwood Rd',
    'Redwood St',
    'Palm Ave',
    'Cottonwood Rd',
    'Juniper St',
    'Laurel Ave',
    'Hickory Rd',
    'Beech St',
    'Alder Ave',
    'Sequoia Rd',
  ];
  const id = `person-${i}`;
  const firstName = firstNames[i % firstNames.length];
  const lastName = lastNames[i % lastNames.length];
  const name = `${firstName} ${lastName}`;
  const year = 1970 + (i % 35);
  const month = String((i % 12) + 1).padStart(2, '0');
  const day = String((i % 28) + 1).padStart(2, '0');
  const dateOfBirth = `${day}-${month}-${year}`;
  const status = statusCodes[i % statusCodes.length];
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`;
  const gender = genders[i % genders.length];
  const address = `${100 + i} ${streets[i % streets.length]}`;
  let expandedContent: React.ReactNode;
  if (i % 2 === 0) {
    expandedContent = <div>Expanded content for {name}</div>;
  } else {
    expandedContent = undefined;
  }
  return {
    id,
    name,
    dateOfBirth,
    status,
    email,
    gender,
    address,
    expandedContent,
  };
});
