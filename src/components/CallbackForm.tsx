import { type FormEvent, useState } from 'react';
import {
  Alert,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Group,
  List,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Check, CheckCircle2, Phone, Send } from 'lucide-react';
import { buildWhatsAppUrl, PHONES, WHATSAPP_URL } from '../config/contacts';
import { OBJECT_TYPE_KEYS, objectTypeForMessage, type ObjectTypeKey } from '../i18n/translations';
import { useLanguage } from '../i18n/LanguageContext';
import Footer from './Footer';
import { WhatsAppIcon } from './icons/BrandIcons';

/* ------------------------------------------------------------------ */
/* Phone helpers                                                       */
/* ------------------------------------------------------------------ */

const normalizeDigits = (input: string): string => {
  let digits = input.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.length === 10 && !input.trim().startsWith('+')) digits = `7${digits}`;
  if (digits.length === 12 && (digits[1] === '7' || digits[1] === '8')) digits = `7${digits.slice(2)}`;
  if (digits === '78') digits = '7';
  if (digits[0] === '8') digits = `7${digits.slice(1)}`;
  if (digits[0] !== '7') digits = `7${digits}`;
  return digits.slice(0, 11);
};

export const formatPhone = (input: string): string => {
  const d = normalizeDigits(input);
  if (!d) return '';
  const r = d.slice(1);
  let out = '+7';
  if (r.length > 0) out += ` (${r.slice(0, 3)}`;
  if (r.length >= 3) out += ')';
  if (r.length > 3) out += ` ${r.slice(3, 6)}`;
  if (r.length > 6) out += `-${r.slice(6, 8)}`;
  if (r.length > 8) out += `-${r.slice(8, 10)}`;
  return out;
};

const isPhoneValid = (value: string) => normalizeDigits(value).length === 11;

interface FormState {
  name: string;
  phone: string;
  objectType: ObjectTypeKey;
  comment: string;
}

const buildMessage = (
  { name, phone, objectType, comment }: FormState,
  tags: string[],
): string => {
  const parts = [
    'Здравствуйте, ProCam! Заявка с сайта на расчёт системы видеонаблюдения:',
    `👤 Имя: ${name.trim()}`,
    `📞 Телефон: ${phone}`,
    `🏢 Объект: ${objectTypeForMessage(objectType)}`,
  ];
  if (tags.length > 0) {
    parts.push(`🏷️ Параметры: ${tags.join(', ')}`);
  }
  if (comment.trim()) {
    parts.push(`💬 Комментарий: ${comment.trim()}`);
  }
  return parts.join('\n');
};

const openWhatsApp = (url: string) => {
  const win = window.open(url, '_blank');
  if (win) {
    win.opener = null;
  } else {
    window.location.href = url;
  }
};

type Errors = Partial<Record<'name' | 'phone', string>>;

const initialState: FormState = { name: '', phone: '', objectType: 'house', comment: '' };

export default function CallbackForm() {
  const { t } = useLanguage();
  const f = t.form;

  const [form, setForm] = useState<FormState>(initialState);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!form.name.trim()) next.name = f.errors.name;
    if (!isPhoneValid(form.phone)) next.phone = f.errors.phone;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg = buildMessage(form, selectedTags);
    const url = buildWhatsAppUrl(msg);
    openWhatsApp(url);
    setSent(true);
  };

  const selectData = OBJECT_TYPE_KEYS.map((key) => ({
    value: key,
    label: f.objectTypes[key],
  }));

  return (
    <Box
      component="section"
      id="contacts"
      className="vms-screen-section bg-architectural-grid"
      style={{ justifyContent: 'space-between' }}
    >
      <Container size="xl" w="100%" my="auto">
        <Paper
          bg="dark.9"
          c="white"
          radius="xl"
          p={{ base: 'lg', sm: 36, lg: 44 }}
          style={{ border: '1px solid #27272A' }}
        >
          <Grid gutter={{ base: 28, lg: 44 }} align="center">
            {/* ============================================================ */}
            {/* LEFT COLUMN: Intro, Bullets, Clickable Phones                */}
            {/* ============================================================ */}
            <Grid.Col span={{ base: 12, lg: 5 }}>
              <Stack gap="sm">
                <Group gap="xs">
                  <Badge
                    color="teal"
                    variant="dot"
                    size="md"
                    radius="xl"
                    styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                  >
                    {f.eyebrow}
                  </Badge>
                </Group>

                <Title order={2} fz={{ base: 24, sm: 32, lg: 38 }} c="white" lh={1.12}>
                  {f.title}
                </Title>

                <Text c="gray.4" fz="sm" lh={1.6}>
                  {f.subtitle}
                </Text>

                <List
                  spacing="xs"
                  my={4}
                  icon={
                    <ThemeIcon color="teal" variant="light" size={20} radius="xl">
                      <Check size={12} />
                    </ThemeIcon>
                  }
                >
                  {f.bullets.map((b) => (
                    <List.Item key={b}>
                      <Text c="gray.2" fz="sm" fw={500}>
                        {b}
                      </Text>
                    </List.Item>
                  ))}
                </List>

                <Stack gap="xs" pt="sm" style={{ borderTop: '1px solid #27272A' }}>
                  <Group gap="sm" wrap="wrap">
                    <Button
                      component="a"
                      href={PHONES.main.tel}
                      variant="outline"
                      color="gray.2"
                      radius="xl"
                      size="md"
                      leftSection={<Phone size={15} color="#10B981" />}
                      styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                    >
                      {PHONES.main.display}
                    </Button>

                    <Button
                      component="a"
                      href={PHONES.extra.tel}
                      variant="outline"
                      color="gray.5"
                      radius="xl"
                      size="md"
                      leftSection={<Phone size={15} />}
                      styles={{ label: { fontFamily: 'var(--font-mono)' } }}
                    >
                      {PHONES.extra.display}
                    </Button>
                  </Group>

                  <Group>
                    <Button
                      component="a"
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="subtle"
                      color="teal"
                      size="xs"
                      radius="xl"
                      leftSection={<WhatsAppIcon size={15} />}
                    >
                      {t.contacts.write}
                    </Button>
                  </Group>
                </Stack>
              </Stack>
            </Grid.Col>

            {/* ============================================================ */}
            {/* RIGHT COLUMN: Clean Form + 4 Clean Quick Tags                */}
            {/* ============================================================ */}
            <Grid.Col span={{ base: 12, lg: 7 }}>
              <Paper
                component="form"
                noValidate
                onSubmit={onSubmit}
                p={{ base: 'md', sm: 'xl' }}
                radius="lg"
                bg="dark.8"
                c="white"
                style={{ border: '1px solid #27272A' }}
              >
                <Stack gap="sm">
                  <Box>
                    <Text fz="xs" fw={600} c="gray.4" mb={6}>
                      {f.quickTagsTitle}
                    </Text>
                    <Chip.Group multiple value={selectedTags} onChange={setSelectedTags}>
                      <Group gap={6}>
                        {f.quickTags.map((tag) => (
                          <Chip
                            key={tag}
                            value={tag}
                            variant="outline"
                            color="teal"
                            size="xs"
                            radius="xl"
                            styles={{
                              label: {
                                color: '#E4E4E7',
                                borderColor: '#3F3F46',
                              },
                            }}
                          >
                            {tag}
                          </Chip>
                        ))}
                      </Group>
                    </Chip.Group>
                  </Box>

                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                    <TextInput
                      size="md"
                      required
                      label={f.nameLabel}
                      placeholder={f.namePlaceholder}
                      value={form.name}
                      error={errors.name}
                      styles={{
                        label: { color: '#E4E4E7', marginBottom: 4, fontSize: 13 },
                        input: { fontSize: 16 },
                      }}
                      onChange={(e) => {
                        const val = e.currentTarget.value;
                        setForm((prev) => ({ ...prev, name: val }));
                        setSent(false);
                        setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                    />

                    <TextInput
                      size="md"
                      required
                      type="tel"
                      label={f.phoneLabel}
                      placeholder={f.phonePlaceholder}
                      value={form.phone}
                      error={errors.phone}
                      styles={{
                        label: { color: '#E4E4E7', marginBottom: 4, fontSize: 13 },
                        input: { fontSize: 16, fontFamily: 'var(--font-mono)' },
                      }}
                      onFocus={() => !form.phone && setForm((p) => ({ ...p, phone: '+7' }))}
                      onBlur={() => form.phone === '+7' && setForm((p) => ({ ...p, phone: '' }))}
                      onChange={(e) => {
                        const formatted = formatPhone(e.currentTarget.value);
                        setForm((prev) => ({ ...prev, phone: formatted }));
                        setSent(false);
                        setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                    />
                  </SimpleGrid>

                  <Select
                    size="md"
                    label={f.objectTypeLabel}
                    data={selectData}
                    value={form.objectType}
                    allowDeselect={false}
                    styles={{
                      label: { color: '#E4E4E7', marginBottom: 4, fontSize: 13 },
                      input: { fontSize: 16 },
                    }}
                    onChange={(val) => {
                      if (val) {
                        setForm((prev) => ({ ...prev, objectType: val as ObjectTypeKey }));
                      }
                    }}
                  />

                  <Textarea
                    size="md"
                    minRows={2}
                    maxRows={3}
                    autosize
                    label={`${f.commentLabel} (${f.optional})`}
                    placeholder={f.commentPlaceholder}
                    value={form.comment}
                    styles={{
                      label: { color: '#E4E4E7', marginBottom: 4, fontSize: 13 },
                      input: { fontSize: 16 },
                    }}
                    onChange={(e) => {
                      const val = e.currentTarget.value;
                      setForm((prev) => ({ ...prev, comment: val }));
                    }}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    radius="xl"
                    fullWidth
                    color="gray.0"
                    c="dark.9"
                    fw={800}
                    mt={4}
                    leftSection={<Send size={18} />}
                  >
                    {f.submit}
                  </Button>

                  <Text fz="xs" c="gray.5" ta="center">
                    {f.note}
                  </Text>

                  {sent && (
                    <Alert
                      color="teal"
                      variant="light"
                      radius="lg"
                      icon={<CheckCircle2 size={16} />}
                    >
                      {f.success}
                    </Alert>
                  )}
                </Stack>
              </Paper>
            </Grid.Col>
          </Grid>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}
