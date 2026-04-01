// Utility functions for managing waitlist submissions

export interface WaitlistSubmission {
  id: string;
  name: string;
  email: string;
  frustration: string;
  timestamp: string;
  emailFailed?: boolean;
}

const STORAGE_KEY = 'scrapivo-waitlist-submissions';

export const getSubmissions = (): WaitlistSubmission[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading submissions:', error);
    return [];
  }
};

export const addSubmission = (submission: WaitlistSubmission): void => {
  try {
    const submissions = getSubmissions();
    submissions.push(submission);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  } catch (error) {
    console.error('Error saving submission:', error);
  }
};

export const exportSubmissionsAsCSV = (): string => {
  const submissions = getSubmissions();
  if (submissions.length === 0) return '';

  const headers = ['ID', 'Name', 'Email', 'Frustration', 'Timestamp', 'Email Failed'];
  const rows = submissions.map(sub => [
    sub.id,
    sub.name,
    sub.email,
    sub.frustration,
    sub.timestamp,
    sub.emailFailed ? 'Yes' : 'No'
  ]);

  const csv = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  return csv;
};

export const downloadSubmissionsCSV = (): void => {
  const csv = exportSubmissionsAsCSV();
  if (!csv) {
    alert('No submissions to export');
    return;
  }

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `scrapivo-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
};

// Add to window for console access
if (typeof window !== 'undefined') {
  (window as any).scrapivoSubmissions = {
    getAll: getSubmissions,
    exportCSV: downloadSubmissionsCSV,
    count: () => getSubmissions().length,
  };
}
