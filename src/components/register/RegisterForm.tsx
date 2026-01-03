"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerTeamUiSchema, type RegisterTeamUiInput } from "@/lib/validators/registerTeamUiSchema";
import { DEFAULT_PLAYERS } from "@/components/register/defaults";
import { createTicketAction } from "@/components/register/actions";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Field, ErrorText } from "@/components/ui/Field";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { AccordionItem } from "@/components/ui/Accordion";

function TermsDropdown() {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-black/10 bg-white/60">
      <button
        type="button"
        className="w-full p-4 md:p-5 flex items-center justify-between rounded-2xl hover:bg-white/60 transition"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="text-left">
          <div className="font-semibold text-ink">Terms & Conditions</div>
          <div className="text-xs text-black/60 mt-0.5">Tap to view summary (full text in later steps)</div>
        </div>
        <div className="text-bootred font-bold">{open ? "−" : "+"}</div>
      </button>
      {open ? (
        <div className="p-4 md:p-5 pt-0 text-sm text-black/70 space-y-2">
          <p>
            <b>Summary:</b> By registering, you confirm all players are employees and agree to event rules and liability clauses.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Accurate details must be submitted for all 10 players.</li>
            <li>Logo (PNG) required; Brand Guidelines (PDF) optional.</li>
            <li>QR ticket verification will be used at check-in.</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();

  const form = useForm<RegisterTeamUiInput>({
    resolver: zodResolver(registerTeamUiSchema),
    mode: "onTouched",
    defaultValues: {
      companyName: "",
      email: "",
      managerName: "",
      phone: "",
      captainName: "",
      captainPhone: "",
      players: DEFAULT_PLAYERS,
    } as any,
  });

  const { control, register, handleSubmit, formState, setValue, watch } = form;
  const { errors, isSubmitting } = formState;

  const { fields } = useFieldArray({ control, name: "players" });

  const logoFile = watch("logoPng" as any) as File | undefined;
  const guidelineFile = watch("brandGuidelinesPdf" as any) as File | undefined;

  const onSubmit = handleSubmit(async (values) => {
    const res = await createTicketAction(values);
    router.push(`/register/success?token=${encodeURIComponent(res.token)}`);
  });

  const checkClass = "h-4 w-4 rounded border border-black/20 accent-bootred";

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="font-display text-2xl text-bootred">Team Details</h2>
          <p className="text-sm text-black/60 mt-1">Enter your company/team details.</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field>
            <Label>Company / Team Name</Label>
            <Input placeholder="e.g., ABC Sports LLC" {...register("companyName")} />
            <ErrorText>{errors.companyName?.message}</ErrorText>
          </Field>

          <Field>
            <Label>Email</Label>
            <Input type="email" placeholder="name@company.com" {...register("email")} />
            <ErrorText>{errors.email?.message}</ErrorText>
          </Field>

          <Field>
            <Label>Manager Name</Label>
            <Input placeholder="Full name" {...register("managerName")} />
            <ErrorText>{errors.managerName?.message}</ErrorText>
          </Field>

          <Field>
            <Label>Phone</Label>
            <Input placeholder="+971..." {...register("phone")} />
            <ErrorText>{errors.phone?.message}</ErrorText>
          </Field>

          <Field>
            <Label>Captain Name</Label>
            <Input placeholder="Full name" {...register("captainName")} />
            <ErrorText>{errors.captainName?.message}</ErrorText>
          </Field>

          <Field>
            <Label>Captain Phone</Label>
            <Input placeholder="+971..." {...register("captainPhone")} />
            <ErrorText>{errors.captainPhone?.message}</ErrorText>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-display text-2xl text-bootred">Players (10)</h2>
          <p className="text-sm text-black/60 mt-1">Fill all 10 players. Use accordions to keep it clean.</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {fields.map((f, idx) => {
            const pErr = (errors.players?.[idx] ?? {}) as any;
            const subtitle = [watch(`players.${idx}.fullName`) || "—", watch(`players.${idx}.position`) || "—"].join(" • ");

            return (
              <AccordionItem key={f.id} title={`Player ${idx + 1}`} subtitle={subtitle} defaultOpen={idx === 0}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <Label>Full Name</Label>
                    <Input placeholder="Player full name" {...register(`players.${idx}.fullName`)} />
                    <ErrorText>{pErr.fullName?.message}</ErrorText>
                  </Field>

                  <Field>
                    <Label>Phone</Label>
                    <Input placeholder="+971..." {...register(`players.${idx}.phone`)} />
                    <ErrorText>{pErr.phone?.message}</ErrorText>
                  </Field>

                  <Field>
                    <Label>Jersey Number</Label>
                    <Input type="number" min={1} max={99} {...register(`players.${idx}.jerseyNumber`)} />
                    <ErrorText>{pErr.jerseyNumber?.message}</ErrorText>
                  </Field>

                  <Field>
                    <Label>Position</Label>
                    <Input placeholder="e.g., Defender" {...register(`players.${idx}.position`)} />
                    <ErrorText>{pErr.position?.message}</ErrorText>
                  </Field>

                  <Field className="md:col-span-2">
                    <Label>Jersey Size</Label>
                    <Select {...register(`players.${idx}.jerseySize`)}>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </Select>
                    <ErrorText>{pErr.jerseySize?.message}</ErrorText>
                  </Field>
                </div>
              </AccordionItem>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-display text-2xl text-bootred">Brand Uploads</h2>
          <p className="text-sm text-black/60 mt-1">Logo is required (PNG). Brand guidelines are optional (PDF).</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field>
            <Label>Company Logo (PNG) *</Label>
            <Controller
              control={control as any}
              name={"logoPng" as any}
              render={({ field }) => (
                <Input type="file" accept="image/png" onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)} />
              )}
            />
            <div className="text-xs text-black/60">{logoFile ? `Selected: ${logoFile.name}` : "No file selected"}</div>
            <ErrorText>{(errors as any).logoPng?.message}</ErrorText>
          </Field>

          <Field>
            <Label>Brand Guidelines (PDF)</Label>
            <Controller
              control={control as any}
              name={"brandGuidelinesPdf" as any}
              render={({ field }) => (
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => field.onChange(e.target.files?.[0] ?? undefined)}
                />
              )}
            />
            <div className="text-xs text-black/60">
              {guidelineFile ? `Selected: ${guidelineFile.name}` : "No file selected"}
            </div>
            <ErrorText>{(errors as any).brandGuidelinesPdf?.message}</ErrorText>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-display text-2xl text-bootred">Confirmations</h2>
          <p className="text-sm text-black/60 mt-1">These are mandatory to proceed.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <TermsDropdown />

          <div className="rounded-2xl border border-black/10 bg-white/60 p-4 md:p-5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className={checkClass}
                defaultChecked={false}
                onChange={(e) => setValue("confirmEmployees" as any, e.target.checked as any, { shouldValidate: true })}
              />
              <span className="text-sm text-black/75">I confirm all 10 players are employees of the company.</span>
            </label>
            <ErrorText>{(errors as any).confirmEmployees?.message}</ErrorText>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className={checkClass}
                defaultChecked={false}
                onChange={(e) => setValue("acceptTerms" as any, e.target.checked as any, { shouldValidate: true })}
              />
              <span className="text-sm text-black/75">I agree to the Terms & Conditions.</span>
            </label>
            <ErrorText>{(errors as any).acceptTerms?.message}</ErrorText>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-xs text-black/55">Step 2: Submit generates a PDF ticket with embedded QR.</p>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit & Generate Ticket"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
